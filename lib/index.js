'use strict';

// HTTP SERVER

var express = require('express');
var app = express();

var SocketIO = require('socket.io');
var io = new SocketIO();

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

io.on('connection', function (socket) {
  socket.on('event', function (m) {
    socket.broadcast.emit('event', m);
  });
});

io.listen(3001)
