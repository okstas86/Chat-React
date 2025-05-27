const express = require('express')

const app = express()
const PORT = 5000
const http = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173",

  }
})



app.get('api', (req,res) => {
  res.json({
    message: 'Hello',
  })
})

const users = []
const messages = [];
io.on('connection', (socket) => {
  console.log(`${socket.id} user connected`)
  
  socket.on('message', (data) => {
    messages.push(data)
    io.emit('response', data)
  })

  socket.on('getMessages', () => {
  io.emit('messageHistory', messages);
});

 socket.on('newUser', (data) => {
  const userExists = users.some(u => u.socketId === data.socketId);

  if (!userExists) {
    users.push(data);
  }

  console.log('users', users);
  io.emit('getUsers', users);
})

  socket.on('typing', (data) => {
    socket.broadcast.emit('responseTyping', data)
  })
  socket.on('stopTyping', () => {
    socket.broadcast.emit('responseTyping', '');
});

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected`)
     // Удаление пользователя по socket.id
    const index = users.findIndex((u) => u.socketId === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }

    io.emit('getUsers', users);
    })
})
app.use(cors())

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})