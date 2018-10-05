import { Directive,Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userAlive:boolean

  constructor(private auth:AuthService) {

    this.userAlive=false
    this.auth.isUserExistsObservable.subscribe( data=> this.userAlive=data)
  }

  ngOnInit() {
    
  }

}
