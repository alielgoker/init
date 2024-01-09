import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import express from 'express'
// const app = express()
dotenv.config()

// Connect to database
export const connectDB = async () => {
  let url = process.env.MONGO_URI
  try{
    mongoose.set('strictQuery', true)
    const conn = await mongoose.connect(url, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })

    console.log(`MongoDB Connected Successfully ✔️💥`);
  }catch(erorr){
    console.error(`Erorr: ${erorr.message}`);
    process.exit(1)
  }
}


// // App connection function
// export const appConnect = () => {
//    let PORT = process.env.PORT || 5000
//   app.listen(PORT  ,()=>{
//     console.log(`App Connected in port ${PORT } 💯✔️`);
//   })
// }
