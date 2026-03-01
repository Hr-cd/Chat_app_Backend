import express from 'express'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { initSocket } from "./SocketIO/server.js";
const app = express()
const port = 3000
// const URI = process.env.MONGODB_URI;

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // or your React app URL
    credentials: true, // ✅ allow cookies
  })
);

// database connection
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected"))
  .catch(err => console.error(err));

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.get('/', (req, res) => {
  res.send('Hello Hr')
})

// ✅ create http server
const server = http.createServer(app);


// ✅ initialize socket
initSocket(server);


// ✅ ONE PORT ONLY
server.listen(port,()=>{

 console.log("Server running on",port);

});
