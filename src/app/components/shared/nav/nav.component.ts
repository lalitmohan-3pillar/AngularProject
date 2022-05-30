import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerToClearFieldsService } from 'src/app/services/messenger-to-clear-fields.service';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {  

  constructor(private authService:AuthService,private msg:MessengerService,
              private message:MessengerToClearFieldsService, private router:Router) 
  { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) 
      { 
        this.itemName=''
      }
    });
  }
  
  currentUser:any;
  itemName:any
  TotalCartItem:any;

  ngOnInit(){
    this.authService.getLoggedInName.subscribe(name => this.currentUser = name);// by getLoggedInName it immediate referesh the page to reflect user name in header
   
    this.message.getMsgClearFields().subscribe((res)=>{
      if(res=='clear Range and Search')
        {
        this.itemName=''
        }
      else if (res!='clear Range and Search' && res!='clear Range')
        {
        this.TotalCartItem=res
        }
    }) 
      
  }  
  Logout()
  {   
    this.itemName=''
    this.TotalCartItem=''
    this.currentUser=localStorage.removeItem("currentUser");// retrun void       
  }
  searchText(){  
    //console.log(this.itemName) 
    this.msg.sendMsg(this.itemName);       
  }

}
