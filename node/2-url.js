'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

const server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('you have accessed the root');
        res.end();
    } else if (req.url.indexOf('/test/') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        //console.log(req.url);
        res.write('you have accessed "' + decodeURIComponent(req.url.substr(6)) + '" within test');
        res.end();

    } else if (req.url.indexOf('/attributes') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const parseObj = url.parse(req.url, true);
        const params = parseObj.query;
        //console.log(params);
        var table = '<!DOCTYPE html><html><body><table border="1">';
        for(var each in params) {
            table += '<tr><td>' + each + '</td>' + '<td>' + params[each] + '</td></tr>'; 
            //console.log(params[each]);
        }
        table += '</table></body></html>';
        //console.log(table);
        res.write(table);
        res.end();
    } else {
        res.end();
    }
});

//console.log('sever listening on port 8080');
server.listen(process.env.PORT||8080);
// http://localhost:8080/ should return 'you have accessed the root' in plain text

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