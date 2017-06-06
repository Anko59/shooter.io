var express = require('express');
var app = express();
var server = app.listen(80);
var Servers = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/css/style.css', function(req, res){
  res.sendFile(__dirname + '/css/style.css');
});
app.get('/css/bootstrap.css', function(req, res){
  res.sendFile(__dirname + '/css/bootstrap.css');
});
app.get('/css/bootstrap-theme.css', function(req, res){
  res.sendFile(__dirname + '/css/bootstrap-theme.css');
});
app.get('/register.html', function(req, res){
  res.sendFile(__dirname + '/register.html');
});
app.get('/css/register.css', function(req, res){
  res.sendFile(__dirname + '/css/register.css');
});
app.get('/background.png', function(req, res){
  res.sendFile(__dirname + '/background.png');
});
app.get('/Server/H1Z1/Client/index.html', function(req, res){
  res.sendFile(__dirname + '/Server/H1Z1/Client/index.html');
});
// app.get('/Server/H1Z1/Client/sketch.js', function(req, res){
//   res.sendFile(__dirname + '/Server/H1Z1/Client/sketch.js')
// });
app.get('/jquery.js', function(req, res){
  res.sendFile(__dirname + '/jquery.js')
});
app.get('/sketch.js', function(req, res){
  res.sendFile(__dirname + '/sketch.js')
});

 var socket = require('socket.io');
 var io = socket(server).listen(server);
 console.log("metaserver up!");
 io.sockets.on('connection', function newConnection(socket){
   socket.on('Server', function(isServer){
     if (!isServer){
       console.log('user connected')
       var id = Math.round(Math.random()*1000000000);
       socket.emit('id', id);
     } else {
       Servers.push(socket.id);
     }
     socket.on('dataPlayer', function(data){
       var newData = {
         id: data.id,
         pseudo: data.pseudo
       };
      socket.broadcast.to(Servers[0]).emit('newClient', newData);
     });
   });



 });
