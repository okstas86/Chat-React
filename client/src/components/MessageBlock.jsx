import React from 'react'
import { useState } from 'react';

const MessageBlock = ({socket}) => {
  const [message, setMessage] = useState('')
  
  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user'),
        id: `${socket.id}`,
        socketId:socket.id
      })
    }
   
    
    setMessage('')
  }

  return (
    <div className=" p-4 border-t bg-white shadow-inner">
      <form className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSend}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default MessageBlock