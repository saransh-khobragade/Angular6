import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {


  private isUserExists = new Subject<boolean>();
  isUserExistsObservable = this.isUserExists.asObservable();

  constructor() { }

  userAlive(value:boolean){
    this.isUserExists.next(value)
  }

}
