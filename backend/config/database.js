import mongoose from "mongoose"
const connection=async()=>{
    const a=await mongoose.connect(process.env.DB_CONNECTION)
    console.log('connected: ',a.connection.host)
}

export default connection