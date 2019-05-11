'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line

const server = express();
server.use(session({
    secret: ['test'],
    maxAge: null,
    cookie: {}
}));
//server.use(session(cookie));
// preface: use the express-session middleware with the memory storage which should make this task rather easy

// http://localhost:8080/hello should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware
server.get('*', function(req, res) {
    res.set({
        'Content-Type': 'text/plain',
        'Set-Cookie': 'ident=' + req.originalUrl
    })
    if(req.session['cookieHistory'] === undefined) {
        req.session['cookieHistory'] = [];
        req.session['cookieHistory'].push(req.originalUrl);
        res.write('you must be new');
    } else {
        res.write('your history:');
        for(let each in req.session.cookieHistory) {
            res.write('\n  ' + req.session.cookieHistory[each]);
        }
        req.session['cookieHistory'].push(req.originalUrl);
    }
    res.end();
});
// http://localhost:8080/test should return 'your history:\n  /hello' in plain text

// http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text

// http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware
console.log('serving on port 8080');
server.listen(process.env.PORT || 8080);