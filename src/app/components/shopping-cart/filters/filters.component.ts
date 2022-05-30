import { Component, OnInit} from '@angular/core';
import { MessengerToClearFieldsService } from 'src/app/services/messenger-to-clear-fields.service';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  model:any={}
  
  //@Output()  sendDataFromChildToParent:EventEmitter<any>=new EventEmitter<any>();  
  
  constructor(private msg:MessengerService,private message:MessengerToClearFieldsService) { }

  ngOnInit(){
    this.message.getMsgClearFields().subscribe((res)=>{
      if(res=='clear Range' || res=='clear Range and Search')
      {
        this.model.from='';
        this.model.to=''; 
      }   
    })    
  }

  Send(){    
    let data:any={from:this.model.from,to:this.model.to}    
    this.msg.sendMsg(data);       
    //this.sendDataFromChildToParent.emit(data);    
  }
  Clear(){
    this.model.from='';
    this.model.to='';
    let data:any={from:this.model.from,to:this.model.to}    
    this.msg.sendMsg(data); 
    return 0;  
  }

}
