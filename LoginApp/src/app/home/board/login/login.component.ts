import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() userExists=new EventEmitter<Event>();

  constructor(private Auth:AuthService,private router:Router) { 
    
  }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;

    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    this.Auth.isUser(username,password).subscribe(res=>{
      console.log(res.body)
      if(res.status==200){
        if(res.body.success){
          this.Auth.setLoggedInUser(username);
          this.router.navigate(['profile']);
          event="hey"
          this.userExists.emit(event);
        }
        else{
          alert(res.body.message)
        }
        
      }
      else
      {
        alert("Api call failed");
      }
    });

  }


}
