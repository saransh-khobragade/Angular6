import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../../service/interaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails={
    fname:"",
    lname:"",
    email:"",
    phone:4567,
    dob:""
  }
  userAlive:string;

  receiveMessage($event) {
   
  }
  constructor(private user:UserService,private auth:AuthService,private Auth:AuthService,private router:Router,private comm:InteractionService) { }

  ngOnInit(){
          this.userAlive=this.auth.getloggedInUser
          this.user.getUser(this.userAlive).subscribe(data=>{
          this.userDetails=data;
        }
      );
  }
      
  logout(){
    this.auth.logout(this.userAlive).subscribe(data=>{
      if(data){
        this.router.navigate(['login']);
        this.comm.userAlive(false)
      }
    
  }

}
