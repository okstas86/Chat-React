import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Body from '../components/Body.jsx'
import MessageBlock from '../components/MessageBlock.jsx'
import { useState } from 'react'

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
  const handleResponse = (data) => {
    setMessages(prev => [...prev, data])
  }

  socket.on('response', handleResponse)

  return () => {
    socket.off('response', handleResponse) // удаляем слушатель при размонтировании
  }
}, [socket])

  // useEffect(() => {
  //   socket.on('response', (data) =>
  //     setMessages([...messages, data])
  //     )

  // })
  return (
    <div className="chat-page flex h-screen bg-gray-100">
      
      <aside className="w-64 bg-white border-r shadow-md hidden sm:block">
        <Sidebar />
      </aside>

   
      <main className="flex-1 flex flex-col">
      
        <div className="p-4 bg-white shadow-md border-b">
          <Body messages={messages} />
        </div>

       
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <MessageBlock socket={socket} />
        </div>
      </main>
    </div>
  );
};


export default ChatPage