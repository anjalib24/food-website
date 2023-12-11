import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(`-----MONGODB_DEV_URI--------${process.env.MONGODB_DEV_URI}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_DEV_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB