import React from 'react'
import { useState, useRef } from 'react';

const MessageBlock = ({socket}) => {
  const [message, setMessage] = useState('')
  const typingTimeoutRef = useRef(null);
   

  // const isTyping=()=>socket.emit('typing',`${localStorage.getItem('user')} is typing`)
    const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    socket.emit('typing', `${localStorage.getItem('user')} is typing`);

    // Очищаем старый таймер
    clearTimeout(typingTimeoutRef.current);

    // Ставим новый таймер на отправку "stopTyping" через 3 сек
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping');
    }, 3000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user'),
        id: `${socket.id}-${Math.random()}`,
        socketId: socket.id
      });

      // Очистка ввода и статуса "typing"
      setMessage('');
      socket.emit('stopTyping');
      clearTimeout(typingTimeoutRef.current);
    }
  };
  
  // const handleSend = (e) => {
  //   e.preventDefault()
  //   if (message.trim() && localStorage.getItem('user')) {
  //     socket.emit('message', {
  //       text: message,
  //       name: localStorage.getItem('user'),
  //       id: `${socket.id}-${Math.random()}`,
  //       socketId:socket.id
  //     })
  //   }
  //   setMessage('')
  //   socket.emit('stopTyping');
  // }

  return (
    <div className=" p-2 bg-white shadow-inner">
      <form className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Введите сообщение..."
          value={message}
          onChange={handleInputChange}
          // onKeyDown={isTyping}
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