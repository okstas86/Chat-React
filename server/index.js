const express = require('express')

const app = express()
const PORT = 5000
const http = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173",
    // methods: ["GET", "POST"],
    // credentials: true

  }
})

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected`)
  socket.on('message', (data) => {
    console.log('Message', data)
    io.emit('response', data)
  })
  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected`)
    })
})

app.get('api', (req,res) => {
  res.json({
    message: 'Hello',
  })
})
app.use(cors())

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})