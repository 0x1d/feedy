module.exports = {
	feedUrl: 'http://showrss.info/user/76295.rss?magnets=true&namespaces=true&name=null&quality=null&re=null',
	checkFeedInterval: '*/10 * * * * *',
	rTorrent: {
		mode: 'xmlrpc',
		host: '127.0.0.1',
		port: 80,
		path: '/RPC2',
    		user: 'user',
		pass: 'password'
	}
};
