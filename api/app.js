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

var channels = {};

io.on('connect', function(socket) {
  socket.on('message', function(message) {
    io.emit('message', message);
  });

  socket.on('messageTo', function(userId, message) {
    socket.broadcast.to(channels[userId]).emit('message', message);
  });

  socket.on('userId', function(userId) {
    channels[userId] = socket.id;

    console.log(channels);
  });

  socket.on('disconnect', function() {
    Object.keys(channels).forEach(function(userId) {
      if(channels[userId] === socket.id) delete channels[userId];
    });
  });
});

// io.on('connect', function(socket) {
//   console.log("User connected with socket id of: "+ socket.conn.id);
//   console.log("rooms ", socket.adapter.rooms)
//   socket.on('message', function(message) {
//     io.emit('message', message);
//     console.log("message", message)
//   });

//   // privateMessage
//   socket.on('privateMessage', function(privateMessage) {
//     io.emit('privateMessage', privateMessage);
//     console.log("privateMessage" , privateMessage)
//   })


// // subscribe for a private chat 
// socket.on('subscribe', function(data) {
//   socket.join(data.room);
//   console.log("Rooms", socket.adapter.rooms)
// })

// // emit the private message only in the testRoom
// socket.on('privateMessage', function(data) {
//  io.sockets.in('testRoom').emit('privateMessage', data);
// })

// });

server.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});


