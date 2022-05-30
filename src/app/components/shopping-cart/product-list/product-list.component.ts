import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { WishlistService } from 'src/app/services/wishlist.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { MessengerToClearFieldsService } from 'src/app/services/messenger-to-clear-fields.service';
import { AddtoCartWithUser } from 'src/app/models/addto-cart-with-user';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Product[]=[]
  filterList:Product[]=[]
  wishlist:number[]=[]

  //@Input() mydata:any
  // totalLength:any;
  
  page:number=1;
  productName:string  
  user:any=localStorage.getItem("currentUser");


  constructor(private productService:ProductService,private wishlistService:WishlistService,
              private msg:MessengerService,
              private message:MessengerToClearFieldsService) { }

  ngOnInit() {    
    
    this.loadProducts();
    this.loadWishList();

    this.msg.getMsg().subscribe((res:any)=>{      
      console.log(res)
      if(res &&  !res.from && !res.to && !(res instanceof AddtoCartWithUser) ){       
        this.searchText(res);
      }
      else if(res && res.from && res.to)
      {
        this.searchProductwithInRange(res);
      }       
      else{        
      this.loadProducts();
      this.loadWishList();
      }
    }); 
    
  }

  loadProducts()
  {    
    this.productService.getProducts().subscribe((product)=>{
      this.productList=product;  
      this.filterList=product;  // this is done becuase category wise searching not working if we click from nothing to all
      });
  }

  loadWishList(){

    this.wishlistService.getWishList().subscribe((productIds:any)=>{    
    this.wishlist=productIds    
  })
}
searchText(itemName:any){
    this.message.sendMsgClearFields("clear Range");

    this.filterList=this.productList.filter(res=>{
      return res.name.toLocaleLowerCase().match(itemName.toLocaleLowerCase());
    });   
     
}
searchCategoryWise(category:string){  
  this.productName='';
  this.message.sendMsgClearFields("clear Range and Search");
  if(category===''){
    this.ngOnInit();
  }else{
    this.filterList=this.productList.filter(res=>{   
      return res.category.toLocaleLowerCase().match(category.toLocaleLowerCase());    
    });
   }
  }
  searchProductwithInRange(range:any){   
      this.filterList=this.productList.filter(res=>{
        return res.price>=range.from && res.price<=range.to
      });    
  }
}
