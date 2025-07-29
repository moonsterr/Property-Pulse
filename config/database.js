import mongoose from 'mongoose';

let connected = false;
const connectDB = async () => {
  mongoose.set('strictQuery', true);
  // if the database is already conntected dont reconnect
  if (connected) {
    console.log('Mongodb is already connected.');
    return;
  }

  //connect to DB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log(mongoose.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
