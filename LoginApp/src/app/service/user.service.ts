import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Observable } from '../../../node_modules/rxjs';

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

    constructor(private http: HttpClient) { }

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