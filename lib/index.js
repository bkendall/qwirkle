'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static('static'));

app.get('/',
  function (req, res) {
    res.render('index');
  });

app.listen(3000, function () {
  console.log('listening on port 3000...');
});
