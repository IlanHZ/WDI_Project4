var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = require('./config/routes');
var config = require('./config/app');

app.use(express.static(__dirname + '/public'));


// hook sockets into it
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);

mongoose.connect(config.databaseUrl);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: config.appUrl,
  credentials: true
}));

app.use('/', router);

io.on('connect', function(socket) {
  console.log("User connected with socket id of: "+ socket.conn.id);
  socket.on('message', function(message) {
    // console.log(message)
    // get the message in the front-end, send the message back to the client
    io.emit('message', message)
  });
});


server.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});