import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 
  userDetails={
    id:0,
    fname: "",
    lname: "",
    email:"",
    phone:0,
    gender:"",
    dob:""
  }

  recommendedUser={
    users:['Ankita','Neelam','Chaya','shalini','srishti','rahul','anand','vikas','vishal']
  }
  userAlive:string;
  
  constructor(private user:UserService,private auth:AuthService) { }

  ngOnInit() { 
    
      this.user.userDetails.subscribe(data=>{
        this.userDetails=data
        this.user.getRecommendedFriends(this.userDetails.email).subscribe(data=>{
        console.log(data)
        })
       
      });
      
  }

  

}
