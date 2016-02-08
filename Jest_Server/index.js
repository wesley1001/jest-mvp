/*jslint node:true */
'use strict';

/**
TODO
Don't bother with the mongodb for now. Just hard-code in an array of data,
and work off that array.

Just work with a single group for now!
(no need for multiple groups -> it's an MVP)

Goals:
1. Enable chat between all group members.
^ just send a post to the server, and load all messages from server at a
fixed interval! (no need to have the server notify all peeps)

2. Allow any group member to add a group event, that all other members can see

- NB: can keep the event templates local, then send a post request
-> no need to load from the server for now
NB: don't allow the addition of extra group members
-> no need for now
**/

// NB: just load the last 20 chat messages (delete the rest)
var chatMessages = [
  {
    speaker: 'Foo',
    message: 'Foo msg',
  },
  {
    speaker: 'Bar',
    message: 'bar says',
  },
  {
    speaker: 'Baz',
    message: 'Baz postulates',
  },
  {
    speaker: 'Lol',
    message: 'trolololololol',
  }
];

var groupEvents = [
  {
      what: 'Sample Dinner',
      where: 'Hill',
      when: '6pm'
  },
];

var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// For parsing the parameters of post
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.send('hello world');
}).post('/', function(req, res) {
  res.send('Post request to the homepage');
});

// Add a chat message
app.post('/addmsg', function(req, res) {
  var msg = req.body.msg;
  assert.notEqual(msg, null);
  chatMessages.unshift(msg);
  if(chatMessages.size > 10) {
    console.log('Number messages: ' + chatMessages.length);
    chatMessages.pop();
  }
});

// Get the past chat messages
app.get('/getmessages', function(req, res) {
  res.json(chatMessages);
});

// Add a group event
app.post('/addevent', function(req, res) {
    var event = req.param('event', null);
    assert.notEqual(event, null);
    groupEvents.push(event);
});

// Get the group events
app.get('/getevents', function(req, res) {
  res.json(groupEvents);
});

var server = app.listen(8082, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Jest MVP server listening at http://%s:%s", host, port);
});
