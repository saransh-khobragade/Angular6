import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  username="saransh@gmail.com";
  password="12345";

  constructor(private Auth:AuthService,private router:Router) { 
    
  }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;

    //const username = target.querySelector('#username').value;
    //const password = target.querySelector('#password').value;

    this.Auth.isUser(this.username,this.password).subscribe(data=>{
      if(data.success){
        this.Auth.setLoggedIn(true);
        this.router.navigate(['profile']);
      }
      else
      {
        alert(data.message);
      }
    });

  }


}
