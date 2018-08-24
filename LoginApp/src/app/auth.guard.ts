import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,private router:Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggedIn){
      return true;
    }
    else{
      return this.auth.isUserLoggedIn().pipe(map(res=>{
        if(res.status){
          this.auth.setLoggedIn(true)
          return true
        }
        else{
          this.router.navigate(['login'])
          return false
        }
      }))
      
    }
      
  }
}
