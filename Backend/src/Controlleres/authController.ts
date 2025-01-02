import { Request, Response } from 'express';
import User from '../Model/User'; // Import User model
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'

dotenv.config();

// User Registration
export const register = async (req: Request, res: Response):Promise<any> => {
  const { name, email, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user and hash password
  const newUser = new User({
    name,
    email,
    password,
    role,
  });

  // Save the user to the database
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  // Return the token and role to the client
  res.status(201).json({ token, role: newUser.role });
};



const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Set your JWT secret in the .env file

// Login Controller
export const login = async (req: Request, res: Response):Promise<any> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      secretKey,
      { expiresIn: '1h' } // Token expiration
    );

    // Return the token and user details
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
