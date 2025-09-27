import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, X } from 'lucide-react'

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    assignedTo: ''
  })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingTask, setLoadingTask] = useState(false)
  
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  useEffect(() => {
    loadUsers()
    if (isEditing) {
      loadTask()
    }
  }, [id])

  const loadUsers = async () => {
    try {
      const response = await axios.get('/auth/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const loadTask = async () => {
    try {
      setLoadingTask(true)
      const response = await axios.get(`/tasks/${id}`)
      const task = response.data
      
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        priority: task.priority,
        assignedTo: task.assignedTo || ''
      })
    } catch (error) {
      toast.error('Failed to load task')
      navigate('/dashboard')
    } finally {
      setLoadingTask(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setLoading(true)

    try {
      const taskData = {
        ...formData,
        assignedTo: formData.assignedTo || undefined
      }

      if (isEditing) {
        await axios.put(`/tasks/${id}`, taskData)
        toast.success('Task updated successfully!')
      } else {
        await axios.post('/tasks', taskData)
        toast.success('Task created successfully!')
      }
      
      navigate('/dashboard')
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to save task'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  if (loadingTask) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-lg">Loading task...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 p-8 bg-gradient-to-r from-primary-500 to-purple-600 text-white">
          <button 
            onClick={handleCancel} 
            className="flex items-center justify-center w-10 h-10 border-2 border-white/30 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-1">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h1>
            <p className="opacity-90">
              {isEditing ? 'Update task details' : 'Fill in the details to create a new task'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="form-input"
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              rows={4}
              maxLength={1000}
              className="form-input resize-vertical min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
              Assign To
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select user (optional)</option>
              {users.map(user => (
                <option key={user._id || user.id} value={user._id || user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 justify-end pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={loading}
            >
              <X size={18} />
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Update Task' : 'Create Task'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm