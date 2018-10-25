import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { ReplaySubject } from '../../../node_modules/rxjs';

interface user {
    id:number,
    fname: string,
    lname: string,
    email:string,
    phone:number
    gender:string,
    dob:string
  }
interface res{
    success:boolean,
    message:string
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
      }

    signUpUser(fname,lname, email, password, phone, gender, dob) {
        return this.http.post<user>('/api/user', {fname,lname, email, password, phone, gender, dob }, { observe: 'response' });
    }

    updateUser(fname,lname, email, password, phone, gender, dob){
        const params = new HttpParams();
        params.set('email', email);
        return this.http.put<res>('/api/user', {fname,lname, email, password, phone, gender, dob },{ observe: 'response', params:{email:email}  });
    }

    getUser(username){
        const options = username ?
        { params: new HttpParams().set('email', username) } : {};
        return this.http.get<user>('/api/user/',options);
      }

    getRecommendedFriends(email){
        return this.http.get('/api/friend/recommend',{ observe: 'response', params:{email:email}  });
    }


    getAllInvites(email){
        return this.http.get('/api/notification/getinvites',{ observe: 'response', params:{email:email}  });
    }

    sendInvite(myEmail,friendEmail){
        return this.http.post<res>('/api/invite/send', {myEmail,friendEmail}, { observe: 'response' });
    }

    acceptInvite(sender,reciever){
        return this.http.post<res>('/api/invite/accept', {myEmail:sender,friendEmail:reciever}, { observe: 'response' });
    }

    rejectInvite(sender,reciever){
        return this.http.post<res>('/api/invite/reject', {myEmail:sender,friendEmail:reciever}, { observe: 'response' });
    }

    getAllFriends(email){
        return this.http.get<res>('/api/friend/getAll',{ observe: 'response', params:{email:email}  });
    }






}