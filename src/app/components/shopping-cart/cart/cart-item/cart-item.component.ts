import { Component, Input, OnInit } from '@angular/core';
import { AddtoCartWithUser } from 'src/app/models/addto-cart-with-user';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
 // @Input() myinputMsg:any;
  @Input() cartItem:any;
  
  disable:boolean=false
  product:Product
  addtoCartWithUser: AddtoCartWithUser;
  user: any;
  IdsToRemoveFromCartList:any
  breakloop:boolean=false
  constructor(private productservice:ProductService,private cartservice:CartService,private msg:MessengerService) { }

  ngOnInit(): void {
    //console.log(this.myinputMsg);  
    //console.log(this.cartItem[0]['qty']);  
    if(this.cartItem.qty==1)
      this.disable=true   
    //console.log(this.cartItem.productId)
  }

  IncreaseQty(){
    this.user=localStorage.getItem("currentUser");

    this.productservice.getProduct(this.cartItem.productId).subscribe((res)=>{
      this.product=res
            this.addtoCartWithUser=new AddtoCartWithUser(this.user,this.product)
          //console.log(this.product)    
            this.cartservice.addProductToCart(this.addtoCartWithUser).subscribe(()=>{
            this.msg.sendMsg(this.addtoCartWithUser);
          });
    })
    console.log(this.product)
    //this.cartItem.qty++
    this.disable=false    
  }
  DecreaseQty(){

    this.cartservice.getSingleCartListId_ToRemove(this.cartItem.productId).subscribe((Id:number)=>{
      this.IdsToRemoveFromCartList=Id
    //})
      console.log(this.IdsToRemoveFromCartList)
        //for(let i=0;i<this.IdsToRemoveFromCartList.length;i++) { 
          //console.log(this.IdsToRemoveFromCartList[i])
          this.cartservice.removeProductFromCart(this.IdsToRemoveFromCartList).subscribe((res)=>{
            this.msg.sendMsg(this.user);// need this to show immediate effect and load cart by auto referesh            
        })
        
    })
   
    if(this.cartItem.qty==1)
      this.disable=true    
  }
  RemoveItem(){
    this.cartservice.getSingleItemCartListId_ToRemove(this.cartItem.productId).subscribe((Ids:number[])=>{
      this.IdsToRemoveFromCartList=Ids
    //})
      console.log(this.IdsToRemoveFromCartList)
        for(let i=0;i<this.IdsToRemoveFromCartList.length;i++) { 
          //console.log(this.IdsToRemoveFromCartList[i])
          this.cartservice.removeProductFromCart(this.IdsToRemoveFromCartList[i]).subscribe((res)=>{
            this.msg.sendMsg(this.user);// need this to show immediate effect and load cart by auto referesh       
        })     
        
      }
      })
  }

}
