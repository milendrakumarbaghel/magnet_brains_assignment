import { X, Calendar, User, Clock, Flag } from 'lucide-react'

const TaskModal = ({ task, isOpen, onClose, onEdit, onDelete, onComplete }) => {
  if (!isOpen || !task) return null

  const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isOverdue = (date) => {
    if (!date) return false
    return new Date(date) < new Date() && task.status !== 'completed'
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex-1 mr-4">{task.title}</h2>
          <button 
            onClick={onClose} 
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {task.description || 'No description provided'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar size={16} />
                  <span>Due Date</span>
                </div>
                <div className={`text-base ${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                  {formatDate(task.dueDate)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Flag size={16} />
                  <span>Priority</span>
                </div>
                <div>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Clock size={16} />
                  <span>Status</span>
                </div>
                <div>
                  <span className={`status-badge ${task.status}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <User size={16} />
                  <span>Assigned To</span>
                </div>
                <div className="text-base text-gray-900">
                  {task.assignedUsername || 'Unassigned'}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600">Created By</div>
              <div className="text-base text-gray-900">{task.createdByUsername}</div>
            </div>
          </div>

          <div className="flex gap-3 justify-end flex-wrap">
            {task.status !== 'completed' && (
              <button
                onClick={() => {
                  onComplete(task.id)
                  onClose()
                }}
                className="btn-success"
              >
                Mark Complete
              </button>
            )}
            
            <button
              onClick={() => {
                onEdit(task)
                onClose()
              }}
              className="btn-primary"
            >
              Edit Task
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(task.id)
                  onClose()
                }
              }}
              className="btn-danger"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskModal