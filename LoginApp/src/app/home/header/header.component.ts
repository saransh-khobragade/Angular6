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

  userExists:string;
  userAlive:boolean

  constructor(private auth:AuthService,private router:Router,private user:UserService) {

    this.auth.isUserExistsObservable.subscribe( data=>{
      if(data==="")
      { this.userAlive=false }
      else 
      { this.userAlive=true }
    });
  }

  ngOnInit() {
    this.auth.isUserExistsObservable.subscribe(data=>
      {
        this.user.getUser(data).subscribe(data2=>{
          this.userExists=data2.fname;
        })
    
  })
  }

  logout(){
    this.auth.logout(this.userAlive).subscribe(data=>{
      if(data){
        this.router.navigate(['login']);
        this.auth.userAlive("")
      }


}
