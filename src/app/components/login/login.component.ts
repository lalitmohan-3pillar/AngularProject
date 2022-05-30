import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterationService } from 'src/app/services/registeration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={}
  constructor(private http:HttpClient,private register:RegisterationService,private route:Router,
    private Cookie:CookieService) { }

  ngOnInit(): void {
    this.model.username=this.Cookie.get("username");
    this.model.password=this.Cookie.get("password");
    if(this.model.username && this.model.password)
      this.model.remember=true;
  }

  login()
  {
    //console.log(this.model);
     this.register.getUser().subscribe(res=>{     
       const user =res.find((a:any)=>{       
         return a.user.username===this.model.username && a.user.password===this.model.password
      });
      if(user){    
        localStorage.setItem('currentUser', this.model.username);  
        if(this.model.remember)
        {
          this.Cookie.set("username",this.model.username)
          this.Cookie.set("password",this.model.password)
        }
        this.route.navigate(['./shop']);
      }
      else{        
        alert('username and password not found');
      }      
     })
  }  
  
}
