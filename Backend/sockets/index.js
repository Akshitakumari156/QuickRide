const {Server}=require("socket.io");
const captainSocket=require("../services/sockets/captain.sockets");
module.exports=(httpServer)=>{
const io=new Server(httpServer,{
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