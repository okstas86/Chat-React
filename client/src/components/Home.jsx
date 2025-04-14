import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export const Home=({ socket })=> {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('user',user)
    navigate('/chat')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold" >Вход в чат</h2>
      <label htmlFor='user'></label>
      <input
        type="text"
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Введите имя пользователя"
      />
      <button type="submit">Войти</button>
    </form>
  )
}
