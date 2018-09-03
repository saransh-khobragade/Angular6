import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Observable } from '../../../node_modules/rxjs';
import { promise } from '../../../node_modules/protractor';
import {map} from 'rxjs/operators';

interface register {
  success: boolean,
  message: string
}

interface profile {
  success: boolean,
  email: string,
  message: string
}

interface isLoggedIn {
  status: boolean
}

interface userCheck {
  status: boolean
}

interface user {
  fname: string,
  lname: string,
  email:string,
  phone:Number
  gender:string,
  dob:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedInStatus: boolean;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.LoggedInStatus = value;
  }

  get isLoggedIn(): boolean {
    return this.LoggedInStatus;
  }

  isUser(username, password) {
    return this.http.post<register>('/api/login', { email: username, password });
  }

  isUserExists(id:string):Observable<register>{
    const options = id ?
    { params: new HttpParams().set('email', id) } : {};
    return this.http.get<register>('/api/isUserExist',options);
  }

  isUserLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isUserLoggedIn')
  }

  getUserProfile(): Observable<profile> {
    return this.http.get<profile>('/api/profile')
  }

  signUpUser(fname,lname, email, password, phone, gender, dob) {
    return this.http.post<user>('/api/user', {fname,lname, email, password, phone, gender, dob }, { observe: 'response' });
  }

  getUser(username){
    const options = username ?
    { params: new HttpParams().set('email', username) } : {};
    return this.http.get<user>('/api/user/',options);
  }

  logout(username){
    return this.http.post('/api/logout',{email:username});
  }
}
