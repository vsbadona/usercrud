import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js"
const app = express()
dotenv.config();
app.use(cors())
app.use(express.json())
app.use('/',userRoutes)
const PORT = process.env.PORT
app.listen(PORT || 5000,()=>{
    console.log("App is listening on PORT :",PORT);
})

mongoose.connect(process.env.CONNECTION_URL)
const db = mongoose.connection
db.on("error",(error)=>{console.log(error);})
db.once("open",()=>console.log("Connected To Db"))
