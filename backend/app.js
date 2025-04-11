import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('hello this world');
});

app.listen(3000, () => {
  connectDB();
  console.log('server running');
});
