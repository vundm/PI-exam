var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ids = [1, 2, 3, 4, 5];
var statuses = [1, 2, 3];
var apps = [
  {id: 1, name: 'App 1', status: 1, incidents: 2, impactedFor: '1h15min', mtta: '30min', anomalistFetures: 40},
  {id: 2, name: 'App 2', status: 2, incidents: 2, impactedFor: '1h15min', mtta: '30min', anomalistFetures: 40},
  {id: 3, name: 'App 3', status: 1, incidents: 2, impactedFor: '1h15min', mtta: '30min', anomalistFetures: 40},
  {id: 4, name: 'App 4', status: 2, incidents: 2, impactedFor: '1h15min', mtta: '30min', anomalistFetures: 40},
  {id: 5, name: 'App 5', status: 3, incidents: 2, impactedFor: '1h15min', mtta: '30min', anomalistFetures: 40},
]

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('getApps', apps);

  socket.on('removeApp', function(id){
    if (id != null) {
      var index = apps.findIndex(x => x.id == id);
      apps.splice(index, 1);
    }
    io.sockets.emit('getApps', apps);
  });

  socket.on('getApp', function(id){
    var app = null;
    if (id != null) {
      var index = apps.findIndex(x => x.id == id);
      app = apps[index];
    }
    socket.emit('returnApp', app);
  });

  socket.on('addApp', function(newApp){
    var id = Math.max.apply(Math, apps.map(function(o) { return o.id; })) + 1;
    var newApp = {
      id: id,
      name: newApp.name,
      status: newApp.status, 
      incidents: 2, 
      impactedFor: '1h15min', 
      mtta: '30min', 
      anomalistFetures: 40
    };

    apps.push(newApp);
    io.sockets.emit('getApps', apps);
  });
});

setInterval(function () {
  var updatedApp = updateAppStatus();
  io.emit('updateStatus', updatedApp);
}, 3000);

function updateAppStatus() {
  return {
    id: ids[Math.floor(Math.random() * ids.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }
}

