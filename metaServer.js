var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var gameServer = require("./gameServer.js");
var GameServer = gameServer.GameServer;
var connect = require('connect');
var app = connect()
app.use(favicon(path.join(__dirname, '/images/kalash.png')));

var app = express();
var server = app.listen(80);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/Bootstrap/js/bootstrap.js', function(req, res) {
    res.sendFile(__dirname + '/Bootstrap/js/bootstrap.js');
});
app.get('/css/style.css', function(req, res) {
    res.sendFile(__dirname + '/css/style.css');
});
app.get('/Bootstrap/css/bootstrap.css', function(req, res) {
    res.sendFile(__dirname + '/Bootstrap/css/bootstrap.css');
});
app.get('/Bootstrap/css/bootstrap-theme.css', function(req, res) {
    res.sendFile(__dirname + '/Bootstrap/css/bootstrap-theme.css');
});
app.get('/register.html', function(req, res) {
    res.sendFile(__dirname + '/register.html');
});
app.get('/css/register.css', function(req, res) {
    res.sendFile(__dirname + '/css/register.css');
});
app.get('/background.png', function(req, res) {
    res.sendFile(__dirname + '/background.png');
});
app.get('/Server/H1Z1/Client/index.html', function(req, res) {
    res.sendFile(__dirname + '/Server/H1Z1/Client/index.html');
});
// app.get('/Server/H1Z1/Client/sketch.js', function(req, res){
//   res.sendFile(__dirname + '/Server/H1Z1/Client/sketch.js')
// });
app.get('/jquery.js', function(req, res) {
    res.sendFile(__dirname + '/jquery.js')
});
app.get('/sketch.js', function(req, res) {
    res.sendFile(__dirname + '/sketch.js')
});
app.get('/crown.png', function(req, res) {
    res.sendFile(__dirname + '/images/crown.png')
});
app.get('/skull.png', function(req, res) {
    res.sendFile(__dirname + '/images/skull.png')
});
app.get('/nazi.png', function(req, res) {
    res.sendFile(__dirname + '/images/nazi.png')
});
app.get('/ninja.png', function(req, res) {
    res.sendFile(__dirname + '/images/ninja.png')
});
app.get('/united-states.png', function(req, res) {
    res.sendFile(__dirname + '/images/united-states.png')
});
app.get('/favicon.png', function(req, res) {
    res.sendFile(__dirname + '/images/kalash.png')
});
app.get('/Bootstrap/fonts/glyphicons-halflings-regular.woff2', function(req, res) {
    res.type('application/x-font-woff2');
    res.sendFile(__dirname + '/Bootstrap/fonts/glyphicons-halflings-regular.woff2')
});
app.get('/Bootstrap/fonts/glyphicons-halflings-regular.woff', function(req, res) {
    res.type('application/x-font-woff');
    res.sendFile(__dirname + '/Bootstrap/fonts/glyphicons-halflings-regular.woff')
});
app.get('/Bootstrap/fonts/glyphicons-halflings-regular.ttf ', function(req, res) {
    res.sendFile(__dirname + '/Bootstrap/fonts/glyphicons-halflings-regular.ttf')
});
app.get('/background-animation.js', function(req, res) {
    res.sendFile(__dirname + '/background-animation.js')
});
var socket = require('socket.io');
var io = socket(server).listen(server);
console.log("metaserver up!");
io.sockets.on('connection', function newConnection(socket){
  socket.on('User', function(selected){
    console.log('user connected');
    var id = Math.round(Math.random()*1000000000);
    url = gameServer.getUrl(selected);
    data = {
      id:id,
      url: url
    };
    socket.emit('id', data);
  });
  socket.on("Server",function(data){
    console.log("New Server");
    data.id = socket.id;
    new GameServer(data);
  });

  socket.on('dataPlayer', function(data){
    var newData = {
      id: data.id,
      pseudo: data.pseudo,
    };
    socket.broadcast.to(gameServer.urls[data.url].id).emit('newClient', newData);
  });
  socket.on("Refresh", function(data){
    try{
      gameServer.servers[socket.id].refresh(data);
    }
    catch(e){
      socket.emit('needData',true);
    }
  });

  socket.on('dataPlayer', function(data) {
    var newData = {
      id: data.id,
      pseudo: data.pseudo,
      skinSrc: data.skin + ".png"
    };
    socket.broadcast.to(gameServer.urls[data.url].id).emit('newClient', newData);

  });
  socket.on("Refresh", function(data) {
    try {
      gameServer.servers[socket.id].refresh(data);
    } 
    catch (e) {
    }
  });
});
