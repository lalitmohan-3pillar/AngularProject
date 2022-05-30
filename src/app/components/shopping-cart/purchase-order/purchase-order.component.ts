import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';
import {formatDate} from '@angular/common';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  id:any;
  product:Product
  orderForm:FormGroup;
  CartItems: Cart[]=[] ;
  cartTotal=0;
  order:Order;
  username:any;
  IdsToRemoveFromCartList:number[]=[]
  constructor(private route:ActivatedRoute,private productservice:ProductService,private builder:FormBuilder,
    private msg:MessengerService,
    private cartService:CartService,
    private orderService:OrderDataService,
    private router: Router) { }

  ngOnInit() 
  {
      if(this.route.snapshot.params["id"]>=0)
       {
            this.id=this.route.snapshot.params["id"];            
            this.productservice.getProduct(this.id).subscribe((result)=>{
            this.product=result;             
                this.orderForm.patchValue({   // load the price and item name 
                  item: this.product.name,
                  price: this.product.price
                });
                this.orderForm.controls['item'].disable();
                this.orderForm.controls['price'].disable();
          });
        }
    this.buildForm();
    this.handleSubscription();
    this.loadCartItems();
  }
  buildForm(){
    this.orderForm=this.builder.group({
      address:['',Validators.required],
      item:'',
      price:''
    })
  }
  handleSubscription(){

    this.msg.getMsg().subscribe((product:any)=>{
      this.loadCartItems(); 
    }); 
  }
  loadCartItems(){
    this.cartService.getCartItems().subscribe((items:Cart[])=>{
      this.CartItems=items;
      console.log(this.CartItems)
      this.calcCartToTotal();
    })
  }    
    calcCartToTotal(){
      this.cartTotal=0;
      this.CartItems.forEach(item=>{ 
        this.cartTotal+=(item.qty*item.price)
      })
    }

  orderNow(){
     this.username=localStorage.getItem('currentUser');  
     console.log(this.CartItems)
     if(!this.product && this.CartItems.length>0)
     {
        for(let i=0;i<this.CartItems.length;i++)
        {
          this.order=new Order(this.username,this.orderForm.value.address,formatDate(new Date(), 'yyyy/MM/dd h:mm a', 'en'),
          this.CartItems[i].productName,this.CartItems[i].qty,this.CartItems[i].qty*this.CartItems[i].price) //this.orderForm.getRawValue()  for disabled value

          this.orderService.placeOrder(this.order).subscribe((result)=>{
          this.msg.sendMsg(this.order);
          });
        }
        this.removeItemsFromCartAfterPurchase();
        //if(result)
          //{
          this.router.navigate(['./Order']);
          //}    
          
    }
    else if(this.product)
    {
      this.order=new Order(this.username,this.orderForm.value.address,formatDate(new Date(), 'yyyy/MM/dd', 'en'),
                           this.orderForm.getRawValue().item,1,this.orderForm.getRawValue().price) //this.orderForm.getRawValue()  for disabled value
          
      this.orderService.placeOrder(this.order).subscribe((result)=>{
        this.msg.sendMsg(this.order);
        if(result)
        {
          this.router.navigate(['./Order']);
        }    
     });
    }
    
  }
  removeItemsFromCartAfterPurchase(){
    this.cartService.getCartListId_ToRemove().subscribe((Ids:number[])=>{
      this.IdsToRemoveFromCartList=Ids
        for(let i=0;i<this.IdsToRemoveFromCartList.length;i++) { 
          this.cartService.removeProductFromCart(this.IdsToRemoveFromCartList[i]).subscribe(()=>{
        })
      }
    })
  }
}
