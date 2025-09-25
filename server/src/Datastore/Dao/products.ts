import { Product } from "@/types";

export interface productsDao{
    createProduct(product:Product):void;
    findProductById(id:string):Promise<Product|undefined>;
    listProducts():Promise<Product[]>;
    deleteProducts(id:string):Promise<void>;
}