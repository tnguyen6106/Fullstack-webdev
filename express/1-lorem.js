'use strict';

var express = require('express'); // do not change this line

const server = express();
// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html
server.get('/lorem', function(req, res) {
    res.type('.html')
    res.write('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
    res.status(200);
    res.end();
});

console.log('serving on port 8080');
server.listen(process.env.PORT || 8080);