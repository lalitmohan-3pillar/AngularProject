import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  
  constructor(private msg:MessengerService) { }

  ngOnInit(): void {
  }

  // getDataFromChildToParent(data:any){
  //   console.log(data)    
  //   this.msg.sendMsg(data);
  // }

}
