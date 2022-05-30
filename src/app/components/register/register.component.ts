import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { MessengerService } from 'src/app/services/messenger.service';
import { RegisterationService} from 'src/app/services/registeration.service';
import { Router } from '@angular/router';

function passwordsMatchValidator(form:any){
 const password=form.get('password')
 const confirmPassword=form.get('confirmPassword')

 if(password.value!==confirmPassword.value){
  confirmPassword.setErrors({passwordsMatch:true})
 }else{
  confirmPassword.setErrors(null)
 }
 return null
}
function symbolValidator(control:any){//control=registerForm.get('password')
  //alert(control)
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;
  if(control.value.indexOf('@')>-1){
    return null
    }
    else{
      return {symbol:true}
    }  
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User
  registerForm:FormGroup;

  constructor(private builder:FormBuilder,private regservice:RegisterationService,private msg:MessengerService,
     private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.registerForm=this.builder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      username:['',Validators.required],
      password:['',[Validators.required,symbolValidator,Validators.minLength(4)]],
      confirmPassword:''
    }
    ,{
      validators:passwordsMatchValidator
    }
    )
  }
  register(){
    //console.log(this.registerForm.value.name);
    this.user=new User(this.registerForm.value.name,this.registerForm.value.email,this.registerForm.value.username,
                      this.registerForm.value.password)   
    this.regservice.registerUser(this.user).subscribe((result)=>{
      this.msg.sendMsg(this.user);
      if(result)
      {
        localStorage.setItem('currentUser', this.registerForm.value.username);  
        this.router.navigate(['./shop']);
      } 
    
    });
  }
}
