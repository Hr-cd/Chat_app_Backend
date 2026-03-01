import { Server } from "socket.io";

let io;

const users = {};

export const initSocket = (server)=>{

 io = new Server(server,{

  cors:{
   origin: process.env.CLIENT_URL,
   methods:["GET","POST"],
   credentials:true
  }

 });


 io.on("connection",(socket)=>{

   console.log("User connected",socket.id);

   const userId = socket.handshake.query.userId;

   if(userId){

     users[userId] = socket.id;

   }

   io.emit("getOnlineUsers",Object.keys(users));

   socket.on("disconnect",()=>{

    delete users[userId];

    io.emit("getOnlineUsers",Object.keys(users));

   });

 });

};

export const getReceiverSocketId = (receiverId)=>{

 return users[receiverId];

};

export { io };