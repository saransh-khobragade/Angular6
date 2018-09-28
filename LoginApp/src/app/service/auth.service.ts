import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http'
import { Observable,throwError } from '../../../node_modules/rxjs';
import { retry,catchError } from 'rxjs/operators';

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
  status: number,
  success: boolean,
  message:string
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
    return this.http.post<isUser>('/api/login', { email: username, password }, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError));
  }//used

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


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status==504) alert('Backend is not working')
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
