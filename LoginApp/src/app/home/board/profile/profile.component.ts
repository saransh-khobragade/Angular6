import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnChanges {

  userDetails = {}

  userAlive: string;

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnChanges() {
    this.auth.isUserExistsObservable.subscribe(data => {
      this.user.getUser(data).subscribe(data2 => {
        console.log(data2)
        this.userDetails = data2;
      })
    })
  }

}
