import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(password)
    } catch (error) {
      setError(error.response?.data?.message || 'Error en el login')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[500px] border-2 border-[#640D5F] shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Bienvenido</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4 flex flex-col items-center justify-center">
            <label htmlFor="password" className="block text-sm font-medium text-black text-center">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              required
              className="mt-1 block w-[80%] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] mt-2"
            />
            {error && <p className="text-red-500 text-sm mt-2 text-center font-semibold">{error}</p>}{' '}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/2 align-center text-center bg-[#640D5F] text-white font-semibold py-2 rounded-md  transition duration-200 mt-4 hover:scale-110"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
