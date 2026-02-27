import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file automatically
router.use(protect);

// Routes for /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// Routes for /api/tasks/:id
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

export default router;