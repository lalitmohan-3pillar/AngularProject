import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import {MessengerService}  from  'src/app/services/messenger.service'
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerToClearFieldsService } from 'src/app/services/messenger-to-clear-fields.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  //myInputMessage:string ="I am the parent comppnent" ;

   CartItems: Cart[]=[] ;
  // CartItems=[  
    // {productId:1,productName:'Item 1',qty:2,price:10},
    // {productId:2,productName:'Item 2',qty:4,price:30},
    // {productId:3,productName:'Item 3',qty:5,price:40},
    // {productId:4,productName:'Item 4',qty:1,price:50}
  // ];
  cartTotal:number=0;
  
  constructor(private msg:MessengerService,private cartService:CartService,
              private message:MessengerToClearFieldsService) { }

  ngOnInit() {    
    this.handleSubscription();
    this.loadCartItems(); 
}
handleSubscription(){

  this.msg.getMsg().subscribe((product:any)=>{
    this.loadCartItems(); 
  }); 
}
loadCartItems(){
  this.cartService.getCartItems().subscribe((items:Cart[])=>{
    this.CartItems=items;
    const distinctItem=this.CartItems.filter((value, index) => this.CartItems.indexOf(value) === index).length;
    console.log(distinctItem);// for cartitem's distinct value in cart icon
    this.message.sendMsgClearFields(distinctItem);
    this.calcCartToTotal();
  })
}
  // addProductToCart(product:any){
  //   let productExists=false;

  //   for(let i in this.CartItems){
  //     if(this.CartItems[i].productId===product.id){
  //       this.CartItems[i].qty++;
  //       productExists=true;
  //       break;
  //     }
  //   }
  //   if(!productExists){
  //     this.CartItems.push({
  //       id:0,
  //       productId:product.id,
  //       productName:product.name,
  //       qty:1,
  //       price:product.price
  //     })
  //   }
  //   this.calcCartToTotal();
  // }
  calcCartToTotal(){
    this.cartTotal=0;
    this.CartItems.forEach(item=>{ 
      this.cartTotal+=(item.qty*item.price)
    });

    return 0;
  }

  ngOnDestroy() {
    //this.cartService.forEach((sub) => sub.unsubscribe());
  }
  
}
