import { Component, OnInit,Input } from '@angular/core';
import { InteractionService } from '../../service/interaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userExists:string;
  userAlive:boolean

  constructor(private comm:InteractionService) {

    this.comm.isUserExistsObservable.subscribe( data=>{this.userAlive=data});
  }

  ngOnInit() {
    
  }



}
