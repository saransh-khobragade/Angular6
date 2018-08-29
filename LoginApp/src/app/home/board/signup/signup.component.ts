import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  myForm: FormGroup;
  genders = ['male', 'female'];
  usercreated: boolean = false;
  static Async:AuthService
  
  constructor(private auth: AuthService) {
    SignupComponent.Async=auth

    this.myForm = new FormGroup(
    {
    'username': new FormControl('Saransh ',Validators.required),
    'password': new FormControl('Password',Validators.required),
    'confirmPassword': new FormControl('Password',Validators.required),
    'email': new FormControl('saransh98@gmail.com',[Validators.required,this.asyncValidator.bind(this)]),
    'number': new FormControl('9893203938',Validators.required),
    'birthday': new FormControl('2018-08-01',Validators.required),
    'gender': new FormControl('male',Validators.required),
    }
    );
  }

  onSubmit() {
    this.auth.registerUser(this.myForm.value.username, this.myForm.value.email, this.myForm.value.password, this.myForm.value.phone, this.myForm.value.gender, this.myForm.value.birthday)
      .subscribe(res => {
        if (res.status == 200)
          this.usercreated = true;
        else
          this.usercreated = false;
      });
  }

  confirmPassValidator(control: FormGroup):null|{ invalid: boolean }{
    
    const pass=control.get('password');
    const cpass=control.get('confirmPassword')

    if (pass.value !== cpass.value) {
      cpass.setErrors({notUnique:false})
    }
    else return null ;
  }

  asyncValidator(control: FormControl){
    return this.auth.isUserExists(control.value).subscribe(data=>{
      if(!data.success) {control.setErrors(null);}
      return data.success ? null : { emailTaken: true };
    }
    );
   }

  
}
