# Task Management System

A modern, full-stack task management system built with React + Vite + Tailwind CSS frontend and Express.js + MongoDB backend.

## 🌟 Features

✅ **User Authentication**
- User registration and login with JWT
- Role-based access control (admin/user)
- Secure password hashing with bcryptjs

✅ **Task Management**
- Create, read, update, delete tasks
- Task details: title, description, due date, priority, status
- Assign tasks to users
- Task status tracking (pending, in progress, completed)

✅ **Priority Management**
- Visual priority boards (High, Medium, Low)
- Color-coded priority system
- Kanban-style task organization

✅ **Advanced Features**
- Real-time filtering by priority and status
- Responsive design for all devices
- Toast notifications for user feedback
- Task modals with detailed views
- Overdue task highlighting

✅ **Admin Features**
- User management dashboard
- View all system users
- Assign tasks to any user

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- React Hot Toast for notifications
- Responsive design with CSS Grid/Flexbox

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up here](https://www.mongodb.com/atlas)

## 🚀 Quick Start Guide

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd task-management-system
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
Create a `.env` file in the `backend` directory with the following content:

```env
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/your-database
```

4. **Configure MongoDB:**
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)
   - Create a new cluster
   - Get your connection string and replace the `MONGODB_URI` in `.env`
   - Make sure to replace `<username>`, `<password>`, and `<database>` with your actual values

5. **Start the backend server:**
```bash
npm run dev
```

✅ **Backend should now be running on:** http://localhost:8000

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
Create a `.env` file in the `frontend` directory with the following content:

```env
VITE_API_URL=http://localhost:8000/api
```

4. **Start the frontend server:**
```bash
npm run dev
```

✅ **Frontend should now be running on:** http://localhost:5173 (or another port if 5173 is busy)

### Step 4: Access the Application

1. **Open your browser** and navigate to the frontend URL (usually http://localhost:5173)
2. **Register a new account** - the first user automatically becomes an admin
3. **Start creating and managing tasks!**

## 📁 Project Structure

```
task-management-system/
├── backend/                 # Express.js API server
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js         # User model
│   │   └── Task.js         # Task model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── tasks.js        # Task management routes
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server entry point
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── Users.jsx
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Tailwind CSS styles
│   ├── .env                # Frontend environment variables
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
└── README.md               # This file
```

## 🔧 Configuration Details

### Backend Configuration (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key_here` |
| `PORT` | Backend server port | `8000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |

### Frontend Configuration (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |

## 🌐 Default Ports

- **Backend API**: http://localhost:8000
- **Frontend App**: http://localhost:5173 (Vite may use a different port if 5173 is busy)
- **Database**: MongoDB Atlas (cloud-hosted)

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **Port Already in Use Error:**
   ```bash
   Error: listen EADDRINUSE: address already in use :::8000
   ```
   **Solution:** Change the PORT in `backend/.env` to a different number (e.g., 8001, 3001, etc.)

2. **MongoDB Connection Error:**
   ```bash
   MongooseServerSelectionError: connect ECONNREFUSED
   ```
   **Solution:** 
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify username/password are correct

3. **Frontend Can't Connect to Backend:**
   ```bash
   Network Error
   ```
   **Solution:** 
   - Ensure backend is running on the correct port
   - Check `VITE_API_URL` in `frontend/.env` matches backend port
   - Verify CORS settings in backend

4. **Dependencies Installation Issues:**
   ```bash
   npm ERR! peer dep missing
   ```
   **Solution:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📱 Usage Guide

### 1. First Time Setup
- Register a new account (first user becomes admin)
- Login with your credentials

### 2. Creating Tasks
- Click "New Task" in navigation
- Fill in task details (title is required)
- Set priority, due date, and assign to users
- Tasks appear in appropriate priority columns

### 3. Managing Tasks
- Click any task card to view details
- Use action buttons to edit, complete, or delete
- Filter tasks using dropdown menus
- Drag tasks between priority columns (visual organization)

### 4. Admin Features
- Access "Users" section to manage users
- View user roles and information
- Assign tasks to any user in the system

## 🔌 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Register new user | Public |
| `POST` | `/api/auth/login` | User login | Public |
| `GET` | `/api/auth/users` | Get all users | Admin only |
| `GET` | `/api/auth/profile` | Get current user profile | Authenticated |

### Task Management Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/tasks` | Get tasks with pagination and filters | Authenticated |
| `GET` | `/api/tasks/:id` | Get single task | Authenticated |
| `POST` | `/api/tasks` | Create new task | Authenticated |
| `PUT` | `/api/tasks/:id` | Update task | Authenticated |
| `DELETE` | `/api/tasks/:id` | Delete task | Creator only |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/health` | Check API status | Public |

## 🎯 Priority System

### Visual Organization
Tasks are organized into three color-coded priority columns:

- 🔴 **High Priority** (Red): Urgent tasks requiring immediate attention
- 🟡 **Medium Priority** (Yellow): Important tasks with moderate urgency  
- 🟢 **Low Priority** (Green): Tasks that can be completed when time allows

### Status Tracking
Each task can have one of three statuses:
- **Pending**: Task is created but not started
- **In Progress**: Task is currently being worked on
- **Completed**: Task is finished

## 👥 User Roles

### Regular User
- Create, edit, and delete their own tasks
- View tasks assigned to them
- Update task status and details
- View their profile information

### Admin User
- All regular user permissions
- View and manage all users in the system
- Access user management dashboard
- Assign tasks to any user
- View system-wide statistics

## 🗄️ Database Schema

### Users Collection (MongoDB)
```javascript
{
  _id: ObjectId,                    // Auto-generated unique identifier
  username: String,                 // Unique username (3-30 chars)
  email: String,                    // Unique email address
  password: String,                 // Hashed password (bcrypt)
  role: String,                     // 'user' or 'admin'
  createdAt: Date,                  // Account creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

### Tasks Collection (MongoDB)
```javascript
{
  _id: ObjectId,                    // Auto-generated unique identifier
  title: String,                    // Task title (required, max: 200 chars)
  description: String,              // Task description (optional, max: 1000 chars)
  dueDate: Date,                    // Due date (optional)
  status: String,                   // 'pending', 'in_progress', 'completed'
  priority: String,                 // 'low', 'medium', 'high'
  assignedTo: ObjectId,             // Reference to User (optional)
  createdBy: ObjectId,              // Reference to User (required)
  createdAt: Date,                  // Task creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

## 🎨 Design System (Tailwind CSS)

### Color Palette
```css
Primary Colors:
- Primary 500: #667eea (Main brand color)
- Primary 600: #5a6fd8 (Hover states)

Priority Colors:
- High Priority: #dc2626 (Red)
- Medium Priority: #d97706 (Yellow/Orange)  
- Low Priority: #16a34a (Green)

Status Colors:
- Pending: #d97706 (Yellow)
- In Progress: #2563eb (Blue)
- Completed: #16a34a (Green)
```

### Component Design
- **Cards**: Rounded-2xl corners, shadow-xl, hover animations
- **Buttons**: Multiple variants with hover effects and transitions
- **Forms**: Clean inputs with focus states and validation
- **Badges**: Rounded-full priority and status indicators
- **Modals**: Backdrop blur with slide-up animations
- **Navigation**: Sticky header with backdrop blur

### Responsive Breakpoints
- **Mobile**: < 768px (Stack columns, hide text on small screens)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (3-column priority board layout)

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication with 24-hour expiry
- **Password Security**: bcryptjs hashing with 10 salt rounds
- **Role-Based Access**: Admin and user roles with different permissions
- **Protected Routes**: Middleware authentication for all API endpoints

### Data Protection
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Mongoose ODM with parameterized queries
- **CORS Protection**: Configurable origins for cross-origin requests
- **Environment Variables**: Sensitive data stored in .env files

### Best Practices
- **Secure Headers**: Express security middleware
- **Error Handling**: Proper error responses without sensitive data exposure
- **Rate Limiting**: Can be easily added for production use
- **HTTPS Ready**: Designed for SSL/TLS in production

## 🛠️ Development Features

### Developer Experience
- **Hot Reload**: Instant updates for both frontend (Vite) and backend (Nodemon)
- **ESLint**: Code quality and consistency enforcement
- **Environment Configuration**: Separate dev/prod configurations
- **Error Handling**: Comprehensive error logging and user feedback
- **Loading States**: User-friendly loading indicators throughout the app

### Code Quality
- **Modern JavaScript**: ES6+ features and async/await patterns
- **Component Architecture**: Reusable React components with proper separation
- **Clean Code**: Well-organized file structure and naming conventions
- **Type Safety**: PropTypes validation (can be extended to TypeScript)

## 🚀 Production Deployment

### Backend Deployment (Node.js/Express)

1. **Environment Setup:**
```bash
NODE_ENV=production
JWT_SECRET=your_super_secure_production_secret_here
PORT=8000
MONGODB_URI=mongodb+srv://prod-user:prod-pass@cluster.mongodb.net/prod-db
```

2. **Deployment Options:**
   - **Heroku**: Easy deployment with MongoDB Atlas
   - **DigitalOcean**: App Platform or Droplets
   - **AWS**: EC2, Elastic Beanstalk, or Lambda
   - **Vercel**: Serverless functions

3. **Process Management:**
```bash
# Install PM2 for production
npm install -g pm2

# Start with PM2
pm2 start server.js --name "task-api"
pm2 startup
pm2 save
```

### Frontend Deployment (React/Vite)

1. **Build for Production:**
```bash
cd frontend
npm run build
```

2. **Deployment Options:**
   - **Vercel**: `vercel --prod`
   - **Netlify**: Drag & drop `dist` folder
   - **GitHub Pages**: Static hosting
   - **AWS S3**: Static website hosting

3. **Environment Variables:**
```bash
VITE_API_URL=https://your-api-domain.com/api
```

### Database (MongoDB Atlas)
- **Production Cluster**: Use dedicated cluster for production
- **Backup Strategy**: Enable automated backups
- **Security**: IP whitelisting and strong passwords
- **Monitoring**: Set up alerts for performance and usage

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 88+ | ✅ Fully Supported |
| Firefox | 85+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 88+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Android 88+ | ✅ Fully Supported |

## 📊 Performance Features

### Frontend Optimization
- **Vite Build**: Fast bundling with tree-shaking
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Responsive image handling
- **Caching**: Browser caching for static assets

### Backend Optimization
- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Compression**: Gzip compression for API responses
- **Caching**: Can add Redis for session/data caching

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. **Fork the repository**
2. **Clone your fork:**
```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
```

3. **Create a feature branch:**
```bash
git checkout -b feature/amazing-feature
```

4. **Make your changes and test thoroughly**

5. **Commit with descriptive messages:**
```bash
git commit -m 'Add: Amazing new feature for task management'
```

6. **Push to your branch:**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request** with a clear description of changes

### Code Style Guidelines
- **JavaScript**: Follow ESLint configuration
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind utility classes
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔧 Performance optimizations
- 🧪 Test coverage improvements

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

```
MIT License

Copyright (c) 2024 Task Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support & Contact

### Getting Help
- 📖 **Documentation**: Check this README for detailed setup instructions
- 🐛 **Bug Reports**: Create an issue with detailed reproduction steps
- 💡 **Feature Requests**: Open an issue with your suggestion
- 💬 **Questions**: Use GitHub Discussions for general questions

### Issue Templates
When creating an issue, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

### Response Time
- 🚨 **Critical bugs**: Within 24 hours
- 🐛 **Regular bugs**: Within 3-5 days  
- ✨ **Feature requests**: Within 1 week
- 💬 **Questions**: Within 2-3 days

---

## 🎉 Acknowledgments

- **React Team** for the amazing React framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible NoSQL database
- **Express.js** for the minimal web framework
- **Lucide** for the beautiful icon library

---

**Made with ❤️ for developers who love clean, modern task management**

*Happy coding! 🚀*