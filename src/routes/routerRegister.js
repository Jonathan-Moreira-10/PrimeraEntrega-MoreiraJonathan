import { Router } from "express";
import {ProductManager} from '../manager/productManager.js';
const productManager = new ProductManager("../products.json")


const router= Router();

router.get ("/",async (req,res)=>{
  try {
      const products= await productManager.getProducts();
       res.render('realTimeProducts',{products})
  } catch (error) {
      res.status(404).json({message:error.message});
  }
});





export default router