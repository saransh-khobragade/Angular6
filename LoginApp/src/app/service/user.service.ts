import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { ReplaySubject } from '../../../node_modules/rxjs';

interface user {
    fname: string,
    lname: string,
    email:string,
    phone:number
    gender:string,
    dob:string
  }
  


@Injectable({
    providedIn: 'root'
  })

export class UserService {

    private user = new ReplaySubject<user>();
    userDetails = this.user.asObservable();
    
    constructor(private http: HttpClient) { }

    setUserDetails(user:user){
        this.user.next(user)
        this.user.complete()
      }

    signUpUser(fname,lname, email, password, phone, gender, dob) {
        return this.http.post<user>('/api/user', {fname,lname, email, password, phone, gender, dob }, { observe: 'response' });
    }

    updateUser(fname,lname, email, password, phone, gender, dob){
        return this.http.put<user>('/api/user', {fname,lname, email, password, phone, gender, dob }, { observe: 'response' });
    }

    getUser(username){
        const options = username ?
        { params: new HttpParams().set('email', username) } : {};
        return this.http.get<user>('/api/user/',options);
      }









}