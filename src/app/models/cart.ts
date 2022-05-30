import { Product } from "./product";

export class Cart {
    id:number;
    productId: number;
    productName: string ;
    qty: number;
    price: number;
    userName:string
    
    constructor(id:number,product:Product,qty=1,userName=''){        
        this.id=id;
        this.productId=product.id;
        this.productName=product.name;
        this.price=product.price;        
        //this.userName=userName;
        this.qty=qty;
        this.userName=userName
    }
}
