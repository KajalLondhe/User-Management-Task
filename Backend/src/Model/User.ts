import mongoose, { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Interface for User model
export interface IUser extends Document {
  user?: {
    id: string;
  };
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';  // Role can either be user or admin
  comparePassword(password: string): Promise<boolean>;
}

// Mongoose Schema for User
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'], 
      default: 'user',
    },
  },
  { timestamps: true }
);


UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Middleware to hash the password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Create User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
