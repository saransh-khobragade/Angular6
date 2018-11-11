import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

interface user {  id:number,  fname: string,  lname: string,  email:string,  phone:number,  gender:string,  dob:string,  profilePic:string}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  
  userAlive:Boolean
  userDetails:user

  constructor(private user:UserService) {
    
    this.user.userDetails.subscribe( data=>{
      if(data){
        this.userDetails=data
      }
      
    })
   }

  ngOnInit() {
  }

}
