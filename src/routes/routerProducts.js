import { Router } from "express";
import {ProductManager} from '../manager/productManager.js';

const productManager = new ProductManager("../products.json")

const router= Router();

router.get ("/",async (req,res)=>{
    try {
        const products= await productManager.getProducts();
        
        res.render("home",{products})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await productManager.getProductById(id);
        res.status(200).json({ product})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
        await productManager.createProduct(req.body);
        res.console.log('products')
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const productDelete= await productManager.deleteProduct(id);
        res.status(200).json({message:`Producto id:${productDelete.id} eliminado`})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.delete("/",async(req,res)=>{
    try {
        await productManager.deleteAllProducts();
        res.redirect('/products')
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const productUpdate= await productManager.updateProduct(req.body,id);
        res.status(200).json({productUpdate})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})




export default router;