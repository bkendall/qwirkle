'use strict';

// HTTP SERVER

var express = require('express');
var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static('static'));

app.get('/',
  function (req, res) {
    var bundle = '/js/bundle.js';
    if (process.env.NODE_ENV === 'production') {
      bundle = '/js/bundle.min.js';
    }
    res.render('index', { bundle: bundle });
  });

app.listen(3000, function () {
  console.log('listening on port 3000...');
});

// WEBSOCKET SERVER

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function (ws) {
  ws.on('message', function (m) {
    wss.clients.forEach(function (client) {
      if (client === ws) { return; }
      client.send(m);
    });
  });
});
