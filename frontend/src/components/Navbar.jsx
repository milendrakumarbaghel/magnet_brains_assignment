import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CheckSquare, Home, Plus, Users, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-white/20 p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-semibold text-primary-500 hover:text-primary-600 transition-colors">
          <CheckSquare size={24} />
          <span>Task Manager</span>
        </Link>

        <div className="flex items-center gap-4 flex-1 justify-center">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive('/dashboard') || isActive('/') 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-600 hover:bg-primary-100 hover:text-primary-600 hover:-translate-y-0.5'
            }`}
          >
            <Home size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link 
            to="/tasks/new" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive('/tasks/new') 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-600 hover:bg-primary-100 hover:text-primary-600 hover:-translate-y-0.5'
            }`}
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Task</span>
          </Link>

          {user?.role === 'admin' && (
            <Link 
              to="/users" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/users') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 hover:bg-primary-100 hover:text-primary-600 hover:-translate-y-0.5'
              }`}
            >
              <Users size={18} />
              <span className="hidden sm:inline">Users</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm hidden md:block">
            Welcome, <strong className="text-gray-900">{user?.username}</strong>
          </span>
          <button 
            onClick={handleLogout} 
            className="btn-outline px-4 py-2 text-sm hover:bg-red-500 hover:border-red-500 hover:text-white"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar