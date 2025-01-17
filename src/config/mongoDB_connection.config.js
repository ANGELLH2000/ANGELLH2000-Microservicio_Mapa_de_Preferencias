import 'dotenv/config';
import mongoose from "mongoose";
const connectMongoDB = async (cliente) => {
    try {
        await mongoose.connect(`${process.env.HOST_DB}${cliente}BD`)
        console.log(`DB-connect to ${cliente}BD`)
    } catch (error) {
        console.log(error)
    }
}
const disconnectMongoDB= async()=>{
    try {
        mongoose.disconnect();
        console.log('DB-disconnect')
    } catch (error) {
        console.log(error)
    }
}
export { connectMongoDB,disconnectMongoDB}