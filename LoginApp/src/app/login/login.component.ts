import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

    this.Auth.getUserDetails(this.username,this.password).subscribe(data=>{
      if(data.success){
        this.Auth.setLoggedIn(true);
        
        this.router.navigate(['admin']);
      }
      else
      {
        alert(data.message);
      }
    });

  }

}
