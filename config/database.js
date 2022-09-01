import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
  if (connection.isConnected) return;
  const mongoURI =
    process.env.MONGO_URI || "mongodb://localhost:27017/meetpoint";
  try {
    const db = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
