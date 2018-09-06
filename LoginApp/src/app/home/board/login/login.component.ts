import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username="saransh98@gmail.com";
  password="Password";

  constructor(private Auth:AuthService,private router:Router) { 
    
  }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;

    //const username = target.querySelector('#username').value;
    //const password = target.querySelector('#password').value;

    this.Auth.isUser(this.username,this.password).subscribe(res=>{
      if(res.status==200){
        this.Auth.setLoggedInUser(this.username);
        this.router.navigate(['profile']);
      }
      else
      {
        alert("Please enter correct details");
      }
    });

  }


}
