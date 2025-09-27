const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get tasks with pagination and filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filter = {
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ]
    };

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Get tasks with populated user data
    const tasks = await Task.find(filter)
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Task.countDocuments(filter);

    res.json({
      tasks: tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo?._id,
        assignedUsername: task.assignedTo?.username,
        createdBy: task.createdBy._id,
        createdByUsername: task.createdBy.username,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single task
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ]
    })
    .populate('assignedTo', 'username email')
    .populate('createdBy', 'username email');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo?._id,
      assignedUsername: task.assignedTo?.username,
      createdBy: task.createdBy._id,
      createdByUsername: task.createdBy.username,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate, priority = 'medium', assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Validate assignedTo user exists if provided
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ error: 'Assigned user not found' });
      }
    }

    const task = new Task({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      assignedTo: assignedTo || req.user.id,
      createdBy: req.user.id
    });

    await task.save();

    // Populate the created task
    await task.populate('assignedTo', 'username email');
    await task.populate('createdBy', 'username email');

    res.status(201).json({
      id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo?._id,
      assignedUsername: task.assignedTo?.username,
      createdBy: task.createdBy._id,
      createdByUsername: task.createdBy.username,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate, status, priority, assignedTo } = req.body;

    // Find task and check permissions
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    // Validate assignedTo user exists if provided
    if (assignedTo && assignedTo !== task.assignedTo?.toString()) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ error: 'Assigned user not found' });
      }
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;

    await task.save();

    // Populate and return updated task
    await task.populate('assignedTo', 'username email');
    await task.populate('createdBy', 'username email');

    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo?._id,
      assignedUsername: task.assignedTo?.username,
      createdBy: task.createdBy._id,
      createdByUsername: task.createdBy.username,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id // Only creator can delete
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;