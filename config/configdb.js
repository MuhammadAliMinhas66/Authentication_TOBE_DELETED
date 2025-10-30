import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();
const connectToMyDatabase =async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("The connection has been made xd ");
    }catch(error){
        console.log(error.message)
    }
}
export default connectToMyDatabase