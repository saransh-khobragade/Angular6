import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string
  userAlive:boolean

  constructor(private auth:AuthService,private router:Router,private user:UserService) {

  }

  ngOnInit() {

    this.auth.isUserExistsObservable.subscribe(data=>
      {
        this.userAlive=data
        if(data){
          
          this.user.userDetails.subscribe(data=>
          {
            console.log(data.fname)
            this.username=data.fname
          })
        }
  })

  }

  logout(){
    this.auth.logout(this.username).subscribe(data=>{
      if(data){
        this.router.navigate(['login']);
        this.auth.userAlive(false)
      }

    })
  }
}
