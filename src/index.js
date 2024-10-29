import express from "express";
import routerProducts from "./routes/routerProducts.js";
import routerCarts from "./routes/routerCarts.js";

const app= express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/products",routerProducts);
app.use("/carts",routerCarts);


app.listen(8080,()=>{
    console.log("server ok en puerto 8080")
})