import mongoose, { Document, Schema, Types } from 'mongoose';

// 1. Define the TypeScript Interface
export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  user: Types.ObjectId; // Links to the User model
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Mongoose Schema
const TaskSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Task title is required'], 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true,
      default: '' 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Completed'], 
      default: 'Pending' 
    },
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  }, 
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);