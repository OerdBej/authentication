import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('hello this world');
});

//allow us to parse the incoming JSON data from HTTP request
app.use(express.json());

//shortcut
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port ${PORT}`);
});
