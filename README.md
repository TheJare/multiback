# Multi Back
Example of a Backbone client app with NodeJS server

This was my first attempt at playing with Backbone, so take it with a grain of salt. It sort of simulates a chatroom, with 2 simultaenous
views of the users. Every second, each user updates an internal field and sends a message to a random target user.

To install, type `npm update` to get the packages, then `node app.js` to run the server, then point your browser to http://localhost:3000/index.html

## Notes

You can try it without the node backend, just by opening the file __static/index.html__ in your browser. You will get console errors
when it tries to communicate with the server, but the client side will work.

Server stuff is very limited and straightforward. The node app keeps the user list in a dictionary (the 'database'), listens to the following requests:

* __GET__/__PUT__ on `/api/usersCollection/`, to retrieve the entire collection / update a bunch of items at once.
* __POST__ on `/api/usersCollection/`, to add a new item to the collection.
* __PUT__/__DELETE__ on `/api/usersCollection/{user id}`, to update or delete an item

When the client starts, it fetches the list of current users from the server. When
a user is created, it sends a post request. When a user is removed, it sends a delete request. Every second, it updates the users and sends __PUT__ updates for
the entire collection.

I'm pretty sure the communication with the server should be handled slightly differently, but I don't know how yet. Right now it feels too manual.
I'm also puzzled by Backbone's lack of a `Collection.save()` function as counterpart to `Collection.fetch()`. It's easy to implement with
`Backbone.sync("update", collection)` so no big complains, but I don't understand the rationale behind this.

The 'Leave' buttons sometimes do not work because every second, the views are refreshed, and the button destroyed and rebuilt; if you have pressed it but
not released it yet when this happens, the click will fail. It would be nicer to update just the fields of the view that need to change.

I used underscore on the server just for the convenient `_.values()` and `_.uniqueId()` functions.

## Credits & License
Copyright by Javier Arevalo in 2012.

- http://www.iguanademos.com/Jare/
- @TheJare on twitter

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

## Attributions

- Client: Uses jQuery, Backbone and Underscore
- Server: Uses NodeJS, Express, and Underscore
