import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  
  userAlive:Boolean
  
  constructor(private auth:AuthService) {
    this.userAlive=false
    this.auth.isUserExistsObservable.subscribe( data=> this.userAlive=data)
   }

  ngOnInit() {
  }

}
