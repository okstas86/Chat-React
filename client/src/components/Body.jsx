import React from 'react'
import {useNavigate } from 'react-router-dom' 

const Body = ({ messages }) => {
  console.log(messages )
  const navigate=useNavigate()
  const heandleLeave = () => {
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <>
      <header className="h-[10vh] bg-amber-100 flex items-center justify-end px-6 shadow-md">
        <button onClick={heandleLeave} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition">
          Покинуть чат
        </button>
      </header>

      <div className="container h-[70vh] overflow-y-auto px-4 py-6 space-y-4 bg-white">
        {messages?.map((element,index) => 
          element.name === localStorage.getItem('user') ? (
          <div key={index} className="chats flex flex-col items-end mr-2">
          <p className="text-sm text-gray-500 mb-1">Вы</p>
          <div className="logo bg-amber-200  rounded-xl max-w-xs text-right shadow">
                <p>{element.text }</p>
          </div>
        </div>
          ) : (
          <div key={index} className="chats flex flex-col items-start">
                <p className="text-sm text-gray-500 mb-1">{ element.name}</p>
            <div className="logo bg-green-600 px-4 py-2 rounded-xl max-w-xs text-right shadow">
                  <p>{ element.text}</p>
            </div>
        </div>
         )
       )}
      

      </div>
    </>
  );
};


export default Body