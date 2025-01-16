import 'dotenv/config';
import mongoose from "mongoose";
const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.HOST_DB)
        console.log("DB-connect")
    } catch (error) {
        console.log(error)
    }
}
const disconnectMongoDB= async()=>{
    try {
        mongoose.disconnect();
        console.log("DB-disconnect")
    } catch (error) {
        console.log(error)
    }
}
export { connectMongoDB,disconnectMongoDB}