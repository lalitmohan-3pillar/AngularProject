import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerToClearFieldsService {

  subject=new Subject();
  constructor() { }

  sendMsgClearFields(product:any){    
    this.subject.next(product);
  }
  getMsgClearFields(){
    return this.subject.asObservable();
  }
}
