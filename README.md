# Task Management System

A comprehensive task management system with user authentication, priority-based task organization, and real-time updates.

## Features

✅ **User Authentication**
- User registration and login
- JWT-based authentication
- Role-based access control (admin/user)

✅ **Task Management**
- Create, read, update, delete tasks
- Task details: title, description, due date, priority, status
- Assign tasks to users
- Task status tracking (pending, in progress, completed)

✅ **Priority Management**
- Visual priority boards (High, Medium, Low)
- Color-coded priority system
- Drag-and-drop between priority lists

✅ **Advanced Features**
- Pagination with AJAX
- Real-time filtering by priority and status
- Confirmation dialogs for deletions
- Responsive design for mobile devices
- Toast notifications for user feedback

✅ **Admin Features**
- User management
- View all users in the system
- Assign tasks to any user

## Tech Stack

**Backend:**
- Node.js + Express.js
- SQLite database
- JWT authentication
- bcryptjs for password hashing

**Frontend:**
- Vanilla JavaScript (ES6+)
- Modern CSS with Flexbox/Grid
- AJAX for API communication
- Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

The `.env` file is already created with default values. For production, update the JWT secret:

```env
JWT_SECRET=your_secure_jwt_secret_here
PORT=3000
NODE_ENV=production
```

### 3. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Default Users

The system starts with an empty database. Register your first user through the web interface.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users (admin only)

### Tasks
- `GET /api/tasks` - Get tasks with pagination and filters
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage Guide

### 1. Registration/Login
- First-time users need to register
- Use the toggle link to switch between login/register forms

### 2. Creating Tasks
- Click "New Task" in the navigation
- Fill in task details (title is required)
- Assign to yourself or other users
- Set priority and due date

### 3. Managing Tasks
- Tasks are organized in priority columns
- Click any task to view details
- Edit, complete, or delete tasks from the detail modal
- Use filters to find specific tasks

### 4. Priority Management
- Tasks are automatically sorted into priority columns
- Visual color coding:
  - 🔴 High Priority (Red)
  - 🟡 Medium Priority (Yellow)
  - 🟢 Low Priority (Green)

### 5. Admin Features
- Admin users can view all system users
- Assign tasks to any user in the system

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- role (admin/user)
- created_at

### Tasks Table
- id (Primary Key)
- title
- description
- due_date
- status (pending/in_progress/completed)
- priority (high/medium/low)
- assigned_to (Foreign Key to Users)
- created_by (Foreign Key to Users)
- created_at
- updated_at

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS protection
- SQL injection prevention with parameterized queries
- Role-based access control

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.