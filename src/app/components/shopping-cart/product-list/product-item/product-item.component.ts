import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import {MessengerService}  from  'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Cart } from 'src/app/models/cart';
import { AddtoCartWithUser } from 'src/app/models/addto-cart-with-user';
import { WishList } from 'src/app/models/wish-list';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  
  @Input() 
  productItem : any

  @Input() 
  addedToWishList:boolean

  user:any=localStorage.getItem("currentUser");
  addtoCartWithUser:AddtoCartWithUser;
  IdToRemoveFromWishList:number

  constructor(private msg:MessengerService,private cartservice:CartService,private wishlistService:WishlistService) {
    
    }

  ngOnInit(): void {
    
  }

  handleAddToCart()
  {  
    
    this.addtoCartWithUser=new AddtoCartWithUser(this.user,this.productItem)
    //console.log(this.productItem)

    //this.cartservice.addProductToCart(new Cart(this.productItem.id,this.productItem,this.user)).subscribe(()=>{
      this.cartservice.addProductToCart(this.addtoCartWithUser).subscribe(()=>{
        //console.log(this.addtoCartWithUser instanceof AddtoCartWithUser)
        this.msg.sendMsg(this.addtoCartWithUser);
    });
   
  }

  handleAddToWishList(){    

   this.wishlistService.addToWishList(new WishList(this.productItem.id,this.user)).subscribe(()=>{
    this.addedToWishList=true;
   })
  }
  
  handleRemoveFromWishList(){
  this.wishlistService.getWishListId_ToRemove(this.productItem.id).subscribe((Id:number)=>{
  this.IdToRemoveFromWishList=Id
        this.wishlistService.removeFromWishList(this.IdToRemoveFromWishList).subscribe(()=>{
          this.addedToWishList=false;
      });   
     })
  }

}
