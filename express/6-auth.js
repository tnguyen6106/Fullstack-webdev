'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line


var basicStrategy = require('passport-http').BasicStrategy

const server = express();
// preface: use the passport middleware and only grant the user "test" with the password "logmein" access
// Reference from https://stackoverflow.com/questions/34378937/basic-auth-with-passport-and-express
server.use(passport.initialize()); // May need to initialize it or you may not
const users = {'test': 'logmein'}
passport.use(new basicStrategy(
    function(username, password, done) {
        if (!users[username] || users[username] != password) {
            return done (null, false);
        }
        return done(null, {username: username});
    }
));

server.get('/hello', function(req, res) {
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('accessible to everyone');
    res.end();
});

server.get('/world', 
    passport.authenticate('basic', { session: false}),
    function(req, res) {
        res.set({
            'Content-Type': 'text/plain'
        });
        res.write('only accessible when logged in');
        res.end();
    }
);

server.get('/test', 
    passport.authenticate('basic', { session: false}),
    function(req, res) {
        res.set({
            'Content-Type': 'text/plain'
        });
        res.write('only accessible when logged in');
        res.end();
    }
);
console.log('serving on port 8080');
server.listen(process.env.PORT || 8080);
// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password