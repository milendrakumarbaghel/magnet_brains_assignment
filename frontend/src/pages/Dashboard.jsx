import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import { Filter, AlertTriangle, Minus, ArrowDown } from 'lucide-react'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priority: '',
    status: ''
  })
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadTasks()
  }, [filters])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        limit: '50',
        ...filters
      })
      
      const response = await axios.get(`/tasks?${params}`)
      setTasks(response.data.tasks)
    } catch (error) {
      toast.error('Failed to load tasks')
      console.error('Load tasks error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleTaskView = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleTaskEdit = (task) => {
    navigate(`/tasks/edit/${task.id}`)
  }

  const handleTaskComplete = async (taskId) => {
    try {
      await axios.put(`/tasks/${taskId}`, { status: 'completed' })
      toast.success('Task marked as completed!')
      loadTasks()
    } catch (error) {
      toast.error('Failed to update task')
      console.error('Complete task error:', error)
    }
  }

  const handleTaskDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await axios.delete(`/tasks/${taskId}`)
      toast.success('Task deleted successfully!')
      loadTasks()
    } catch (error) {
      toast.error('Failed to delete task')
      console.error('Delete task error:', error)
    }
  }

  const groupTasksByPriority = (tasks) => {
    return {
      high: tasks.filter(task => task.priority === 'high'),
      medium: tasks.filter(task => task.priority === 'medium'),
      low: tasks.filter(task => task.priority === 'low')
    }
  }

  const groupedTasks = groupTasksByPriority(tasks)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-lg">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
            <p className="text-gray-600">Manage your tasks efficiently with priority-based organization</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="bg-transparent border-none text-sm text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="bg-transparent border-none text-sm text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* High Priority Column */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-red-500 min-h-[500px] flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <AlertTriangle size={20} className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 flex-1">High Priority</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {groupedTasks.high.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {groupedTasks.high.length > 0 ? (
              groupedTasks.high.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onView={handleTaskView}
                  onEdit={handleTaskEdit}
                  onComplete={handleTaskComplete}
                  onDelete={handleTaskDelete}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400 italic">
                <p>No high priority tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* Medium Priority Column */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-yellow-500 min-h-[500px] flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <Minus size={20} className="text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 flex-1">Medium Priority</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {groupedTasks.medium.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {groupedTasks.medium.length > 0 ? (
              groupedTasks.medium.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onView={handleTaskView}
                  onEdit={handleTaskEdit}
                  onComplete={handleTaskComplete}
                  onDelete={handleTaskDelete}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400 italic">
                <p>No medium priority tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Priority Column */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-green-500 min-h-[500px] flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <ArrowDown size={20} className="text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900 flex-1">Low Priority</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {groupedTasks.low.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {groupedTasks.low.length > 0 ? (
              groupedTasks.low.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onView={handleTaskView}
                  onEdit={handleTaskEdit}
                  onComplete={handleTaskComplete}
                  onDelete={handleTaskDelete}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400 italic">
                <p>No low priority tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {tasks.length === 0 && !loading && (
        <div className="text-center py-16 card">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-8">Create your first task to get started!</p>
          <button 
            onClick={() => navigate('/tasks/new')} 
            className="btn-primary text-lg px-8 py-3"
          >
            Create Task
          </button>
        </div>
      )}

      <TaskModal
        task={selectedTask}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEdit={handleTaskEdit}
        onComplete={handleTaskComplete}
        onDelete={handleTaskDelete}
      />
    </div>
  )
}

export default Dashboard