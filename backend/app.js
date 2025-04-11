import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('hello this world');
});

//shortcut
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  connectDB();
  console.log('server running');
});
