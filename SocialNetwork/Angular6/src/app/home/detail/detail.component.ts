import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent{
 
  userDetails={
    id:0,
    fname: "",
    lname: "",
    email:"",
    phone:0,
    gender:"",
    dob:""
  }

  recommendedUser=[]
  userAlive:string;
  reccuser:string

  constructor(private user:UserService,private auth:AuthService) { 
    this.refreshRecommendedList()
  }

  refreshRecommendedList(){
    this.recommendedUser=[]
    this.user.userDetails.subscribe(data=>{
      this.userDetails=data
      this.user.getRecommendedFriends(this.userDetails.email).subscribe(data=>{
        for(let a in data.body){
          this.recommendedUser.push(data.body[a])
        }
      })
     
    });
  }
  invite(recieverEmail){
    this.user.sendInvite(this.userDetails.email,recieverEmail).subscribe(res=>{
      
        if(res.body.success){
          this.refreshRecommendedList()
        }
        else{
          alert(res.body.message)
        }
      
    })
  }

  

}
