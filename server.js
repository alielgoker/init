import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './connection.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
//
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false})) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your client app
  credentials: true,
};

app.use(cors(corsOptions));
  // Connect To Database
  connectDB()
app.use("/uploads" , express.static(path.join(__dirname , "uploads")))  
app.use("/api/users" , userRouter)
app.use("/api/products" , productRouter)

const appConnect = () => {
  let PORT = process.env.PORT || 5000
  app.listen(PORT  ,()=>{
    console.log(`App Connected in port ${PORT } 💯✔️`);
  })
}
// Connect To Server
appConnect();