import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerUrl } from '../config/api';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor(private http:HttpClient) { }

  registerUser(user:any):Observable<any>{
    return this.http.post(registerUrl,{user});
  }
  getUser():Observable<User[]>{
    return this.http.get<User[]>(registerUrl)
  }
}
