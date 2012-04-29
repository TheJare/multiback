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

app.post('/api/usersCollection', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	var uid = _.uniqueId("id_");
	users[uid] = req.body;
	users[uid].id = uid;
	res.send({ id: uid });
	console.log(users);
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

// -- Log other types of requests
app.all('/api/*', function(req, res) {
	console.log("api: ", req.method, req.url, req.params, req.body);
	res.send("ERROR");
});

app.listen(3000)
