'use strict';

var express = require('express'); // do not change this line

var cookieParser = require('cookie-parser');
const server = express();
server.use(cookieParser());

// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
server.get('/missing', function(req, res) {
    res.set({
        'Content-Type': 'text/plain'
    });
   // res.write('your princess is in another castle');
    res.status(404).send('your princess is in another castle');
    res.end();
});

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
server.get('/redirect', function(req, res) {
    res.redirect(302, '/redirected');
    res.end();
});
// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
server.get('/cache', function(req, res) {
    res.set({
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=86400'
    });
    res.write('cache this resource');
    res.end();
});

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
server.get('/cookie', function(req, res) {
    res.set({
        'Content-Type': 'text/plain',
        'Set-Cookie': 'hello=world'
    });
    
    //res.cookie('hello', 'world');
    //res.clearCookie('Path');
    res.write('i gave you a cookie');
    res.end();
});

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
server.get('/check', function(req, res) {
    var cookieContainer = {}; 
    cookieContainer = req.cookies;
    var check = false;
    console.log('inside check');
    console.log(cookieContainer);
    for(let each in cookieContainer){
        if(each === 'hello') {
            check = true;
        }
        console.log(cookieContainer[each]);
    }
    res.set({
        'Content-Type': 'text/plain'
    });
    if(check === true) {
        res.write('yes');
    }
    else {
        res.write('no');
    }
    res.end();
});
console.log('serving on port 8080');
server.listen(process.env.PORT || 8080);