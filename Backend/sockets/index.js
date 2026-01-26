const {Server}=require("socket.io");
const captainSocket=require("../services/sockets/captain.sockets");
let io;
module.exports=(httpServer)=>{
  io=new Server(httpServer,{
    cors:{
        origin:"*",
    },
});
io.on("connection",(socket)=>{
    console.log("New client connected:",socket.id);
    captainSocket(socket);
    socket.on("disconnect",()=>{
        console.log("Client disconnected:",socket.id);
    })
})
}
module.exports.io=()=>io;