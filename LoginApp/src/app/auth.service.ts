import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface register{
  success:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getUserDetails(username,password){
    return this.http.post<register>('/api/register',{email:username,password}).subscribe(data=>{console.log(data)});
    
  }
}
