import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddtoCartWithUser } from 'src/app/models/addto-cart-with-user';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  id: any;
  product:any
  buttonName:boolean=false;
  user:any
  addtoCartWithUser:AddtoCartWithUser;

  constructor(private route: ActivatedRoute,private http:HttpClient,private productservice:ProductService,
    private cartservice:CartService,private msg:MessengerService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.productservice.getProduct(this.id).subscribe((result)=>{
      this.product=result;   
      //console.log(this.product)  
  });
}

handleAddToCart()
  {
    this.user=localStorage.getItem("currentUser");
    this.addtoCartWithUser=new AddtoCartWithUser(this.user,this.product)

    //this.cartservice.addProductToCart(this.product).subscribe((result)=>{
      this.cartservice.addProductToCart(this.addtoCartWithUser).subscribe((result)=>{    
      this.msg.sendMsg(this.addtoCartWithUser);
      if(result)
      {
        this.buttonName=true;//Go to Cart
      }
      else
      {
        this.buttonName=false;//Add to cart
      }
    });
   
  }

}
