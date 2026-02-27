import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.ts';
import Task from '../models/Task.ts';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Only find tasks where the user field matches the logged-in user's ID
    const tasks = await Task.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Task title is required' });
      return;
    }

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'Pending',
      user: req.user?._id, // Attach the task to the current user
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // First, find the task
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Verify the task belongs to the logged-in user
    if (task.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({ error: 'User not authorized to update this task' });
      return;
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body, // Contains the new title, description, or status
      { new: true, runValidators: true } // Returns the updated document and runs schema checks
    );

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Verify the task belongs to the logged-in user
    if (task.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({ error: 'User not authorized to delete this task' });
      return;
    }

    await task.deleteOne();

    res.status(200).json({ id, message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};