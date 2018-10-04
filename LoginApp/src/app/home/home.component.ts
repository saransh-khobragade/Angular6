import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userExists:string;
  userAlive:boolean

  constructor(private auth:AuthService) {
    
    this.userExists="hidden"

    this.auth.isUserExistsObservable.subscribe( data=>{

      if(data)
      {
        this.userExists="visible"
      }
      else
      {
        this.userExists="hidden"

      } 
   });
  }

  ngOnInit() {
    
  }

}
