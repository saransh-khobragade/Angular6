import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 
  userDetails={
    fname:"User",
    lname:"",
    email:"",
    phone:4567,
    dob:""
  }
  userAlive:string;
  
  constructor(private user:UserService,private auth:AuthService) { }

  ngOnInit() { 
    
      this.auth.isUserExistsObservable.subscribe(data=>
        {
          this.user.getUser(data).subscribe(data2=>{
            this.userDetails=data2;
          })
      
    })

    
  }

}
