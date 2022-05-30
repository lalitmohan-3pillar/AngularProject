import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradGuard implements CanActivate {
  
  constructor(private auth:AuthService,private router:Router){

  }
  canActivate()
     {
       if(this.auth.isLoggedIn()){
        return true;
       }
       else{
         this.router.navigate(['/login']);
        return false;
       }
    
     }
  
}