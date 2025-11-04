import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import updateRoutes from "./routes/updateRoutes.js";

dontenv.config();
connectDB();
const app = express();
// app.use(cors())
app.use(express.json());
app.use("/api/updates", updateRoutes);
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(` server is running on : http://localhost:${PORT}`)
})

console.log("hello...");
