import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Users as UsersIcon, Mail, Calendar, Shield, User } from 'lucide-react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/auth/users')
      setUsers(response.data)
    } catch (error) {
      toast.error('Failed to load users')
      console.error('Load users error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-lg">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4 text-primary-500">
            <UsersIcon size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">User Management</h1>
              <p className="text-gray-600">Manage system users and their roles</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 leading-none">
                {users.length}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                Total Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 leading-none">
                {users.filter(user => user.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                Admins
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div 
            key={user._id || user.id} 
            className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-primary-200"
          >
            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white mb-4">
              <User size={24} />
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-4 gap-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {user.username}
                </h3>
                <span className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide
                  ${user.role === 'admin' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-blue-100 text-blue-700'
                  }
                `}>
                  {user.role === 'admin' ? (
                    <>
                      <Shield size={12} />
                      Admin
                    </>
                  ) : (
                    <>
                      <User size={12} />
                      User
                    </>
                  )}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="flex-shrink-0" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-16 card text-gray-400">
          <UsersIcon size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">There are no users in the system yet.</p>
        </div>
      )}
    </div>
  )
}

export default Users