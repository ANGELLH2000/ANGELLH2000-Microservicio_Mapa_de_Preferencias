import 'dotenv/config';
import mongoose from "mongoose";
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.HOST_DB)
        console.log("DB-connect")
    } catch (error) {
        console.log(error)
    }
}
export { connectMongoDB}