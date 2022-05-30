import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {Cart} from 'src/app/models/cart';
import { HttpClient } from '@angular/common/http';
import {cartUrl} from 'src/app/config/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userName:any=localStorage.getItem('currentUser');

  constructor(private http:HttpClient,private authService:AuthService) { 
    this.authService.getLoggedInName.subscribe(name => this.userName = name);//getLoggedInName used here to reflect cart immediate on the basis of user
  }

  getCartItems():Observable<Cart[]>{
    return   this.http.get<Cart[]>(cartUrl).pipe(
      map((result:any[])=>{
        let cartItems:Cart[]=[];

        for(let item of result){
          //console.log(item.product.currentUser)
        let productExists=false;

        for(let i in cartItems){
          if(cartItems[i].productId===item.product.id && item.product.currentUser===this.userName){
            cartItems[i].qty++;
            productExists=true;
            break;
          }
        }
        if(!productExists){
          if(item.product.currentUser===this.userName)
          {
          cartItems.push(new Cart(item.id,item.product,1,item.product.currentUser))
          }
        }
      }
        return cartItems;
      })
    );
  }
  addProductToCart(product:any):Observable<any>{
    return this.http.post(cartUrl,{product});
  }
  removeProductFromCart(productId:any){  
    return this.http.delete(cartUrl+'/'+productId);    
  }
  getCartListId_ToRemove():Observable<number[]>{
    return this.http.get<number[]>(cartUrl).pipe(
      map((result:any[])=>{
        let CartIds: number[]=[]   
        for(let item of result){
          if(item.product.currentUser===this.userName)
          {        
            CartIds.push(item.id)
          }
        }      
        console.log(CartIds)
        return CartIds;
      })
    );
   }
   getSingleCartListId_ToRemove(id:any):Observable<number>{
    return this.http.get<number[]>(cartUrl).pipe(
      map((result:any[])=>{
        let CartId: any 
        for(let item of result){
          if(item.product.currentUser===this.userName && item.product.id===id)
          {        
            return CartId=item.id
          }
        }      
        console.log(CartId)        
      })
    );
   }

   getSingleItemCartListId_ToRemove(id:any):Observable<number[]>{
    return this.http.get<number[]>(cartUrl).pipe(
      map((result:any[])=>{
        let CartId: number[]=[]   
        for(let item of result){
          if(item.product.currentUser===this.userName && item.product.id===id)
          {        
            CartId.push(item.id)
          }
        }      
        console.log(CartId) 
        return CartId;       
      })
    );
   }
}
