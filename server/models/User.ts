import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

//TypeScript Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

//Mongoose Schema
const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  }, 
  { timestamps: true }
);

// Pre-save hook to hash the password
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Method to compare passwords for logging in
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);