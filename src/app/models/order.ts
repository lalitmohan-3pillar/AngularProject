export class Order {
    userName:string;
    shippingAddress:string;
    purchaseDate:string;
    item:string;
    qty:number;
    price:number;

    qtycollection:any;
    itemcollection:any;

   constructor(userName='',shippingaddress='',purchasedate='',item='',qty=0,price=0){
        this.userName=userName,
        this.shippingAddress=shippingaddress,
        this.purchaseDate=purchasedate,
        this.item=item,
        this.qty=qty,
        this.price=price
   } 
//    getcollection(){
//     this.itemcollection=this.item[];
//     this.qtycollection
// } 
}
