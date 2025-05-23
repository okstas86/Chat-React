import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Home=()=> {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('user',user)
    navigate('/chat')
  }
return (
  <form
    className="w-full h-screen bg-gradient-to-br from-yellow-300 to-amber-500 flex flex-col gap-6 justify-center items-center px-4"
    onSubmit={handleSubmit}
  >
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Вход в чат</h2>

      <div className="flex flex-col">
        <label htmlFor="user" className="mb-1 text-gray-700 font-medium">
          Имя пользователя
        </label>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Введите имя"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition w-full"
      >
        Войти
      </button>
    </div>
  </form>
);
}

export default Home