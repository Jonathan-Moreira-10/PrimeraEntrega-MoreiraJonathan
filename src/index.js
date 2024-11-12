import express from "express";
import routerProducts from "./routes/routerProducts.js";
import routerCarts from "./routes/routerCarts.js";
import handlebars  from "express-handlebars";
import path from "path";
import routerRegister from "./routes/routerRegister.js";
import { Server } from "socket.io";

const app= express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/products",routerProducts);
app.use("/carts",routerCarts);
app.use("/register",routerRegister);
app.use(express.static(path.join(process.cwd(),"public")));

app.engine('handlebars',handlebars.engine());
app.set("views",path.join(process.cwd(),"views"));
app.set('view engine','handlebars');


const httpServer=app.listen(8080,()=>{
    console.log("server ok en puerto 8080")
})
const socketServer=new Server(httpServer);
socketServer.on('connection',(socket)=>{
 console.log(`usuario conectado ${socket.id}`)
})