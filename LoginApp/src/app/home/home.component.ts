import { Component, OnInit, Input } from '@angular/core';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userExists:string;
  userAlive:boolean

  constructor(private comm:InteractionService) {
    
    this.userExists="hidden"

    this.comm.isUserExistsObservable.subscribe( data=>{

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
