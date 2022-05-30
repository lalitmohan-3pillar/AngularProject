import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderUrl } from '../config/api';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  constructor(private http:HttpClient) { }

  placeOrder(order:any):Observable<any>{
    return this.http.post(OrderUrl,{order});
  }
  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(OrderUrl)
  }
}
