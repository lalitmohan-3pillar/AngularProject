export class User {
    id:number;
    name:string;
    mail:string;
    username:string;
    password:string;

constructor(name='',mail='',username='',password=''){    
    this.name=name;
    this.mail=mail;
    this.username=username;
    this.password=password;
    }
}
