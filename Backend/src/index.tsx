import express from 'express';
import dotenv from 'dotenv';
import { dbconnection } from './Config/dbconnect';
import authRoutes from './Routes/authRoute'; // Import auth routes
import projectRoute from './Routes/projectRoutes';
import userRoutes from './Routes/userRoutes'
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
dbconnection;
app.use(express.json()); // Middleware for parsing JSON request body
app.use(cors({
  origin:"*"
}))

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoute);
app.use('/api/users', userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
