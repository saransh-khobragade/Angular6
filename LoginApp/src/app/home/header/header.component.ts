import { Component, OnInit,Input } from '@angular/core';
import { InteractionService } from '../../service/interaction.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userExists:string;
  userAlive:boolean

  constructor(private auth:AuthService,private comm:InteractionService,private router:Router) {

    this.comm.isUserExistsObservable.subscribe( data=>{this.userAlive=data});
  }

  ngOnInit() {
    
  }

  logout(){
    this.auth.logout(this.userAlive).subscribe(data=>{
      if(data){
        this.router.navigate(['login']);
        this.comm.userAlive(false)
      }


}
