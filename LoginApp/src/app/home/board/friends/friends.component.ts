import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private user:UserService,private auth:AuthService) { }
  
  ngOnInit() {

    this.auth.isUserExistsObservable.subscribe(data=>
      {
        
        if(data){
          
          this.user.userDetails.subscribe(data=>
          {
            this.user.getAllFriends(data.email).subscribe(data=>console.log(data))
          })
        }
    })
    
  }

}
