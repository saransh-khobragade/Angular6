import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from '../../../node_modules/rxjs';

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

  isUserExists(email) {
    return this.http.get('/api/isUserExist', {params:email});
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
