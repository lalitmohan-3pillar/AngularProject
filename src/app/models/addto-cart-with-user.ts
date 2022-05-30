import { Product } from "./product";
export class AddtoCartWithUser {
    currentUser:string
    id: number;
    name: string ;
    description: string;
    price: number;
    imageUrl: string;
    category:string

    constructor(currentUser:string,product:Product){
        this.currentUser=currentUser;
        this.id=product.id;
        this.name=product.name;
        this.description=product.description;
        this.price=product.price;
        this.imageUrl=product.imageUrl;
        this.category=product.category
    }

}
