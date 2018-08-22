import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from '../../node_modules/rxjs';

interface register{
  success:boolean,
  message:string
}

interface isLoggedIn{
  status:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedInStatus = false;

  constructor(private http:HttpClient) { }

  setLoggedIn(value:boolean){
    this.LoggedInStatus=value;
  }

  get isLoggedIn(){
    return this.LoggedInStatus;
  }

  getUserDetails(username,password){
    return this.http.post<register>('/api/register',{email:username,password});
  }

  isUserLoggedIn():Observable<isLoggedIn>{
    return this.http.get<isLoggedIn>('/api/isUserLoggedIn')
  }
}
