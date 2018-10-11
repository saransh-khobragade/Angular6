import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges {
 
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
    users:[]
  }
  userAlive:string;
  reccuser:string

  constructor(private user:UserService,private auth:AuthService) { 

    this.user.userDetails.subscribe(data=>{
      this.userDetails=data
      this.user.getRecommendedFriends(this.userDetails.email).subscribe(data=>{
        let usr=Array.prototype.slice.apply(data.body)
        usr.forEach(element => {
          this.recommendedUser.users.push(element.fname)
        });
        
      
      })
     
    });
    
  }

  ngOnChanges() { 
    
    
  }

  

}
