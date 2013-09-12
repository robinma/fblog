/**
 * @author jerry
 * session module for node
 */
var sessions = {}, timeout;

exports.lookupOrCreate=lookupOrCreate;
exports.sesstionRoot=sessions;

function ownProp(o, p) {
	return Object.prototype.hasOwnProperty.call(o, p);
}

function lookupOrCreate(req, opts) {
	var id, session;
	opts = opts || {};
	//find or generate a session ID
	id = idFromRequest(req, opts);

	if (ownProp(sessions, id)) {
		session = sessions[id];
	} else {
		session = new Session(id, opts);
		session[id] = session
	}

	session.expiration = (+new Date) + session.lifetime * 1000;
	if (!timeout)
		timeout = setTimeout(clearup, 60000);
		
	return session;
}

function clearup() {
	var id, now, next;
	now = +new Date;
	next = Infinity;
	timeout = null;
	for (id in sessions) {
		if (ownProp(sessions, id)) {
			if (sessions[id].expiration < now) {
				delete sessions[id];
			} else {
				next = next < sessions[id].expiration ? next : sessions[id].expiration
			}
		}
	}
	if (next < Infinity)
		timeout = setTimeout(clearup, next - (+new Date) + 1000)
}

//find or generate a session ID
function idFromRequest(req, opts) {
	if (req.headers.cookie && ( m = /SID=([^ ,;]*)/.exec(req.headers.cookie)) && ownProp(sessions, m[1])) {
		return m[1]
	}

	if (opts.sessionID)
		return opts.sessionID
	return randomString(64)
}

function randomString(bits) {
	var chars, rand, i, ret;
	chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	ret = ''
	while (bits > 0) {
		rand = Math.floor(Math.random() * 0x100000000)// 32-bit integer
		for ( i = 26; i > 0 && bits > 0; i -= 6, bits -= 6)
			ret += chars[0x3F & rand >>> i]
	}
	return ret;
};

function Session(id, opts) {
	this.id = id
	this.data = {}
	this.path = opts.path || '/';
	this.domain = opts.domain;

	if (opts.lifetime) {
		this.persistent = 'persistent' in opts ? opts.persistent : true;
		this.lifetime = opts.lifetime
	} else {
		this.persistent = true;
		this.lifetime = 86400
	}
}

var sesProto = Session.prototype;

sesProto.getSetCookieHeaderValue = function() {
	var parts
	parts = ['SID=' + this.id];
	if (this.path)
		parts.push('path=' + this.path);
	if (this.domain)
		parts.push('domain=' + this.domain);
	if (this.persistent)
		parts.push('expires=' + dateCookieString(this.expiration));
	return parts.join(',');
}
sesProto.destroy = function() {
	delete sessions[this.is]
};
sesProto.serialize = function() {
};

//Thu, 12 Sep 2013 07:48:40 GMT    Thu, 12-Sep-2013 07:48:40 GMT
function dateCookieString(ms) {
	var d, wdy, mon
	d = new Date(ms);
	return d.toUTCString();
}

