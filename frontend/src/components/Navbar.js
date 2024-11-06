import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-[#640D5F] p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <ul className="flex-grow flex justify-center space-x-12">
          <li className="transform transition-transform duration-200 hover:scale-110">
            <Link
              to="/form"
              className="text-white text-lg font-bold transform transition-transform duration-200 hover:scale-110"
            >
              Form
            </Link>
          </li>
          <li className="transform transition-transform duration-200 hover:scale-110">
            <Link
              to="/templates"
              className="text-white text-lg font-bold transform transition-transform duration-200 hover:scale-110"
            >
              Templates
            </Link>
          </li>
          <li className="transform transition-transform duration-200 hover:scale-110">
            <Link to="/articles" className="text-white text-lg font-bold">
              Articles
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-600 transition duration-200 hover:scale-110"
        >
          Salir
        </button>
      </div>
    </nav>
  )
}

export default Navbar
