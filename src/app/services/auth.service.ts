import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getLoggedInName = new Subject(); //Alternate method to Emitting data across Components. Subject() is doing both Emitting data and Subscribing it in another component. So its the best way to compare with Emitting using Output.

  constructor() { }

  isLoggedIn(){
    this.getLoggedInName.next(localStorage.getItem("currentUser"));
    return localStorage.getItem("currentUser");
  }
}
