import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`it's alive 🧟‍♂️`);
  } catch (error) {
    console.log(error);

    //exit the process with failure
    process.exit(1);
  }
};

export default connectDB;
