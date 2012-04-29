var express = require('express')
  , _ = require('underscore')
  , path = require('path')

var app = express.createServer()
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.logger())
app.use(express.bodyParser())

var users = {}

app.get('/api/usersCollection', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	var v = JSON.stringify(_.values(users));
	res.send(v);
	console.log(v);
});

app.put('/api/usersCollection/:id', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	users[req.param('id')] = req.body;
	res.send("ok");
	console.log(users);
});

app.del('/api/usersCollection/:id', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	delete users[req.param('id')];
	res.send("ok");
	console.log(users);
});

app.all('/api/*', function(req, res) {
	console.log("api: ", req.method, req.url, req.params, req.body);
	res.send("[]");
});

app.listen(3000)
