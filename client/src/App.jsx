import { io } from "socket.io-client";
const socket = io.connect('http://localhost:5000')
import Home from './components/Home'
import ChatPage from './components/ChatPage'

import './App.css'
import { Routes,Route } from "react-router-dom";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} /> 
      <Route path="/chat" element={<ChatPage socket={socket} />} /> 
    </Routes>
  )
}

export default App
