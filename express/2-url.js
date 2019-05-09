'use strict';

var express = require('express'); // do not change this line

const server = express();

// http://localhost:8080/ should return 'you have accessed the root' in plain text
server.get('/', function(req, res) {
    
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('you have accessed the root');
    res.status(200);
    res.end();
});

server.get('/test/:userID', function(req, res) {
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('you have accessed "' + req.params.userID + '" within test');
    res.end();
});

server.get('/attributes', function(req, res) {
    const attrObj = req.query;
    //console.log(attrObj);
    res.set({
        'Content-Type': 'text/html'
    });
    var table = '<!DOCTYPE html><html><body><table border="1">';
    for(var each in attrObj) {
        table += '<tr><td>' + each + '</td>' + '<td>' + attrObj[each] + '</td></tr>'; 
        //console.log(attrObj[each]);
    }
    table += '</table></body></html>';
    res.write(table);
    res.end();
});

server.get('*', function(req, res) {
    res.end();
});
// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>
console.log('serving on port 8080');
server.listen(process.env.PORT || 8080);