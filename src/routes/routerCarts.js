import { Router } from "express";
import {CartManager} from '../manager/cartManager.js';
const cartManager = new CartManager("../carts.json")

const router= Router();

router.get ("/",async (req,res)=>{
    try {
        const carts= await cartManager.getCarts();
        res.status(200).json(carts)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const cart= await cartManager.getCartById(id);
        res.status(200).json({ cart})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
        const cart= await cartManager.createCart(req.body);
        res.status(200).json({cart});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const cartDelete= await cartManager.deleteCart(id);
        res.status(200).json({message:`Producto id:${cartDelete.id} eliminado`})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.delete("/",async(req,res)=>{
    try {
        await cartManager.deleteAllCarts();
        res.json({message:'Productos eliminados'})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const cartUpdate= await cartManager.updateCart(req.body,id);
        res.status(200).json({cartUpdate})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.get("/:idCart",async(req,res)=>{
    try {
        const {idCart}=req.params;
        res.json(await cartManager.getCartById(idCart))
        res.status(200).json({cartUpdate})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.post("/:idCart/product/:idProd",async(req,res)=>{
    try {
        const {idProd}=req.params;
        const {idCart}=req.params;
        const response= await cartManager.savedProductToCart(idCart,idProd);
        res.json(response);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
    
})




export default router;