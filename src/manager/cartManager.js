import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {ProductManager} from './productManager.js';
const productManager = new ProductManager("../products.json")

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {  
    try {
      const cart = {
        id: uuidv4(),
        products:[]
      };
      const carts = await this.getCarts();
      const cartExist = carts.find((existingCart) => existingCart.id === cart.id);
      if (cartExist) {
        throw new Error('Producto ya existe');
      } else {
        carts.push(cart);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) { 
    try {
      const carts = await this.getCarts();
      if (!(carts.length > 0)) throw new Error('No hay ningún producto');
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) throw new Error('Producto no encontrado');
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(obj, id) {
    try {
      const carts = await this.getCarts();
      let cart = await this.getCartById(id); 
      cart = {
        ...cart,
        ...obj
      };
      const newArray = carts.filter((cart) => cart.id !== id);
      newArray.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(id) {
    try {
      const cart = await this.getCartById(id);
      const carts = await this.getCarts();
      const newArray = carts.filter((cart) => cart.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllCarts() {
    try {
      const carts = await this.getCarts();
      if (!(carts.length > 0)) throw new Error('Carrito está vacío');
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error);
    }
  }
  async savedProductToCart(idCart,idProd){
   try {
    const prodExist=await productManager.getProductById(idProd);
    if(!prodExist) throw new Error(error);
   let cartsFile= await this.getCarts();
   const cartExist= await this.getCartById(idCart);
   if(!cartExist) throw new Error(`carrito no existe`);
   const existProdInCart= cartExist.products.find((prod)=>prod.id===idProd);
   if(!existProdInCart){
    const product={
        id:idProd,
        quantity:1
    };
    cartExist.products.push(product);  
   } else existProdInCart.quantity+=1;

   const updateCarts=cartsFile.map((cart)=>{
    if(cart.id===idCart) return cartExist;
    else return cart;
   });
   await fs.promises.writeFile(this.path,JSON.stringify(updateCarts));
   return cartExist;
   } catch (error) {
    throw new Error(error)
   }
  }
}
