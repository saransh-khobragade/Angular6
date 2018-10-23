import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  inviteList=[]

  constructor(private user:UserService,private auth:AuthService) { }
  
  ngOnInit() {

    this.auth.isUserExistsObservable.subscribe(data=>
      {
        if(data){
          
          this.user.userDetails.subscribe(data=>
          {
            this.user.getAllInvites(data.email).subscribe(data=>{
              for(let a in data.body){
                 this.inviteList.push(data.body[a])
              }
            })
          })
        }
    
      })
  }

}
