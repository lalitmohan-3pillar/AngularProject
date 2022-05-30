import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderdata:any ;
  constructor(private http:HttpClient,private orderservice:OrderDataService) { }

  ngOnInit() {
     this.orderservice.getOrders().subscribe((res:any)=>{

      this.orderdata=res.filter((a:any)=>{
        return a.order.userName?.trim()===localStorage.getItem('currentUser')?.trim()     
      //console.log(a.order.userName)
      //console.log(localStorage.getItem('currentUser'));           
      });
      //console.log(res[0].order.userName)
      //console.log(this.orderdata.order);     
     });
  }

}
