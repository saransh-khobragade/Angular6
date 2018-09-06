import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
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

interface isUser {
  status: number
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedInUser: string;

  constructor(private http: HttpClient) { }

  setLoggedInUser(value: string) {
    this.LoggedInUser = value;
  }

  get getloggedInUser(): string {
    return this.LoggedInUser;
  }

  isUser(username, password){
    return this.http.post<isUser>('/api/login', { email: username, password }, { observe: 'response' });
  }

  isUserExists(id:string){
    const params = new HttpParams();
    params.set('email', id);
    return this.http.get<register>('/api/isUserExist',{ observe: 'response', params:{email:id}  });
  }

  isUserLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isUserLoggedIn')
  }

  getUserProfile(): Observable<profile> {
    return this.http.get<profile>('/api/profile')
  }

  logout(username){
    return this.http.post('/api/logout',{email:username});
  }
}
