import { Calendar, User, Edit, Trash2, CheckCircle } from 'lucide-react'

const TaskCard = ({ task, onEdit, onDelete, onComplete, onView }) => {
  const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString()
  }

  const isOverdue = (date) => {
    if (!date) return false
    return new Date(date) < new Date() && task.status !== 'completed'
  }

  const getPriorityBorderColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-300'
    }
  }

  return (
    <div 
      className={`
        bg-white rounded-xl p-6 mb-4 shadow-lg cursor-pointer transition-all duration-300 
        border-l-4 relative hover:-translate-y-1 hover:shadow-xl group
        ${getPriorityBorderColor(task.priority)}
        ${isOverdue(task.dueDate) ? 'bg-red-50 border-l-red-500' : ''}
      `}
      onClick={() => onView(task)}
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
        <div className="flex gap-2 flex-shrink-0">
          <span className={`priority-badge ${task.priority}`}>
            {task.priority}
          </span>
          <span className={`status-badge ${task.status}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {task.description.length > 100 
            ? `${task.description.substring(0, 100)}...` 
            : task.description
          }
        </p>
      )}

      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-2 flex-1">
          {task.dueDate && (
            <div className={`flex items-center gap-2 text-xs ${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          {task.assignedUsername && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User size={14} />
              <span>{task.assignedUsername}</span>
            </div>
          )}
        </div>

        <div 
          className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {task.status !== 'completed' && (
            <button
              onClick={() => onComplete(task.id)}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all duration-200 hover:scale-110"
              title="Mark as completed"
            >
              <CheckCircle size={16} />
            </button>
          )}
          
          <button
            onClick={() => onEdit(task)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 hover:scale-110"
            title="Edit task"
          >
            <Edit size={16} />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-110"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard