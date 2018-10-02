import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userExists:string;

  public clickedEvent: Event;

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }

  constructor() { }

  ngOnInit() {
    this.userExists="hidden"
  }

}
