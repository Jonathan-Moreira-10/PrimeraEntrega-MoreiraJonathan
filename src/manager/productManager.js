import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

 export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProduct(obj) {  
    try {
      const product = {
        id: uuidv4(),
        ...obj
      };
      const products = await this.getProducts();
      const productExist = products.find((prod) => prod.id === product.id);
      if (productExist) {
        throw new Error('Producto ya existe');
      } else {
        products.push(product);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) { 
    try {
      const products = await this.getProducts();
      if (!(products.length > 0)) throw new Error('No hay ningún producto');
      const product = products.find((prod) => prod.id === id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      let product = await this.getProductById(id); 
      product = {
        ...product,
        ...obj
      };
      const newArray = products.filter((prod) => prod.id !== id);
      newArray.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      const products = await this.getProducts();
      const newArray = products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProducts() {
    try {
      const products = await this.getProducts();
      if (!(products.length > 0)) throw new Error('Carrito está vacío');
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error);
    }
  }
}
