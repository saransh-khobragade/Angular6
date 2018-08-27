import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  myForm: FormGroup;
  genders = ['male', 'female'];
  usercreated: boolean = false;
  
  constructor(private auth: AuthService) {

    this.myForm = new FormGroup(
    {
    'username': new FormControl('Saransh ',Validators.required),
    'password': new FormControl('Password',Validators.required),
    'confirmPassword': new FormControl('Password',Validators.required),
    'email': new FormControl('saransh98@gmail.com',[Validators.required,this.asyncValidator]),
    'number': new FormControl('9893203938',Validators.required),
    'birthday': new FormControl('2018-08-01',Validators.required),
    'gender': new FormControl('male',Validators.required),
    },{ validators:this.confirmPassValidator }
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

  asyncValidator(control: FormControl): Promise<any> | Observable<any> {

    console.log(this.auth.isUserExists('saransh98@gmail.com'));

    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({ 'invalid': true });
          }
          else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }


}
