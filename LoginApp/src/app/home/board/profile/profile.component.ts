import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user="User is name is loading"

  constructor(private Auth:AuthService,private router:Router) { }

  ngOnInit() {

    

    this.Auth.getUserProfile().subscribe(data=>{
      if(data.success){
        this.Auth.setLoggedIn(true);
        this.Auth.getUser(data.email).subscribe(data=>console.log(data));
      }
      else
      {
        alert(data.message);
      }
    });
  }

  logout(){
    this.Auth.logout();
  }

}
