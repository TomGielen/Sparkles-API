const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000
const socketIO = require('socket.io')

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '663311',
  key: '86d6e29d735da206f7c9',
  secret: 'd341294674a3bb1718de',
  cluster: 'eu',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});

app.set('io', io);

server.listen(port, () => console.log(`Listening on port ${port}`))
