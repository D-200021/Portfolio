import mongoose from "mongoose";
import 'dotenv/config';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log("MongoDB Atlas connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

export default connectToMongoDB;