import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import updateRoutes from "./routes/updateRoutes.js";
import uploadRoutes  from "./routes/uploadRoutes.js"

dontenv.config();
connectDB();
const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json());
app.use("/api/updates", updateRoutes);
app.use("/api/updates",uploadRoutes)
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(` server is running on : http://localhost:${PORT}`)
})

console.log("hello...");
// http://localhost:5000/api/updates/upload post : upload photoUrl 