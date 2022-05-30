import { Injectable } from '@angular/core';
import { wishListUrl } from '../config/api';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  userName:any=localStorage.getItem('currentUser');

  constructor(private httpclient:HttpClient,private authService:AuthService) {
    this.authService.getLoggedInName.subscribe(name => this.userName = name);//getLoggedInName used here to reflect wishlist immediate on the basis of user
  }

  getWishList():Observable<any[]>{
   return this.httpclient.get<any[]>(wishListUrl).pipe(
     map((result:any[])=>{
       let productIds: any[]=[]       
       for(let item of result){
        if(item.product.UserName===this.userName)
        {          
          productIds.push(item.product.Id)
        }
       }      
       console.log(productIds)
       return productIds;
     })
   );
  }

  addToWishList(product:any){
   //return this.httpclient.post(wishListUrl,{ id:product.Id,username:product.UserName })
   return this.httpclient.post(wishListUrl,{ product })
  }
  removeFromWishList(productId:any){  
  return this.httpclient.delete(wishListUrl+'/'+productId);
  }

  getWishListId_ToRemove(id:any):Observable<number>{
    return this.httpclient.get<number>(wishListUrl).pipe(
      map((result:any)=>{
        let productIds: any   
        for(let item of result){
         if(item.product.UserName===this.userName && item.product.Id===id)
         {          
           productIds=item.id
         }
        }      
        console.log(productIds)
        return productIds;
      })
    );
   }
}
