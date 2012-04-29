// Example of a Backbone client app with NodeJS server
// Copyright by Javier Arevalo in 2012.
// 
// - http://www.iguanademos.com/Jare/
// - @TheJare on twitter
// 
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

var express = require('express')
  , _ = require('underscore')
  , path = require('path')

// Simple express server setup
var app = express.createServer()
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.logger())
app.use(express.bodyParser())

// Our 'database'
// A dictionary where the key is an 'id' and the value is an object that contains that id as a field named 'id'.
var users = {}

// Our REST-oriented api

// Collection-level
// Fetch the entire collection
app.get('/api/usersCollection', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	res.send(_.values(users));
	console.log(users);
});
// Update the entire collection
app.put('/api/usersCollection', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	_.each(req.body, function(e) { if ('id' in e) users[e.id] = e; });
	res.send(200);
	console.log(users);
});

// Item-level
// Add item to the collection
app.post('/api/usersCollection', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	// Create and assign an id for the new item
	var uid;
	do {
		uid = _.uniqueId("id_");
	} while (uid in users);
	users[uid] = req.body;
	users[uid].id = uid;
	res.send({ id: uid });
	//console.log(users);
});

// Update item
app.put('/api/usersCollection/:id', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	users[req.param('id')] = req.body;
	res.send(200);
	//console.log(users);
});

// Remove item
app.del('/api/usersCollection/:id', function(req, res) {
	console.log("usersCollection api: ", req.method, req.url, req.params, req.body);
	delete users[req.param('id')];
	res.send(200);
	//console.log(users);
});

// -- Log other types of requests for debugging
app.all('/api/*', function(req, res) {
	console.log("api: ", req.method, req.url, req.params, req.body);
	res.send("Unsupported API", 404);
});

app.listen(3000)
console.log("Express listening on http://localhost:3000/");
