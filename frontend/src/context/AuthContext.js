import React, { createContext, useState, useEffect } from 'react'
import { loginCall } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  const login = async (password) => {
    try {
      const data = await loginCall(password)
      setIsLoggedIn(true)
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}
