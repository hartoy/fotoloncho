import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import Form from './pages/FormPage'
import Templates from './pages/TemplatePage'
import ArticlesPage from './pages/ArticlesPage'
import EditArticlePage from './pages/EditArticlePage'

const App = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/form" /> : <LoginPage />} />
        <Route path="/form" element={isLoggedIn ? <Form /> : <Navigate to="/login" />} />
        <Route path="/templates" element={isLoggedIn ? <Templates /> : <Navigate to="/login" />} />
        <Route path="/articles" element={isLoggedIn ? <ArticlesPage /> : <Navigate to="/login" />} />
        <Route path="/edit/:sku" element={<EditArticlePage />} />
      </Routes>
    </Router>
  )
}

export default App
