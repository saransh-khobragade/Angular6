import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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
    return this.http.post<register>('/api/isUserExist',{email:id});
  }

  isUserLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isUserLoggedIn')
  }

  getUserProfile(): Observable<profile> {
    return this.http.get<profile>('/api/profile')
  }

  registerUser(username, email, password, phone, gender, dob) {
    return this.http.post<register>('/api/user', { name: username, email, password, phone, gender, dob }, { observe: 'response' });
  }
}
