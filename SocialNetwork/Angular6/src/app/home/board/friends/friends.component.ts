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
  friendList=[]

  constructor(private user:UserService,private auth:AuthService) { }
  
  ngOnInit() {
    this.refreshList()    
  }

  refreshList(){
    this.auth.isUserExistsObservable.subscribe(data=>
      {
        if(data){
          this.user.userDetails.subscribe(data=>
          {
            this.user.getAllInvites(data.email).subscribe(data=>{
              this.inviteList=[]
              for(let a in data.body){
                 this.inviteList.push(data.body[a])
              }
            })

            this.user.getAllFriends(data.email).subscribe(data=>{
              this.friendList=[]
              for(let a in data.body){
                this.friendList.push(data.body[a])
              }
              console.log(this.friendList)
            })

            
          })
        }
    
      })
  }

  accept(friendEmail){
    
    this.user.userDetails.subscribe(data=>
      {        
        this.user.acceptInvite(data.email,friendEmail).subscribe(data=>{
          if(data.body.success)
          {
            this.refreshList() 
          }
          else{
            alert(data.body.message)
          }
        })
      })
    
  }

  reject(friendEmail){
    this.user.userDetails.subscribe(data=>
      {
        this.user.rejectInvite(data.email,friendEmail).subscribe(data=>{
          if(data.body.success)
          {
            this.refreshList() 
          }
          else{
            alert(data.body.message)
          }
        })
      })
  }

  

}
