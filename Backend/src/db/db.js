import mongoose from "mongoose";
const connectDb = async ()=>{
    try{
         const mongooseObj = await mongoose.connect(process.env.MONGODB_URI);
         console.log('object--->',mongooseObj);

    }catch(error){
     console.error('connection failed',error);
    }

}
export default connectDb