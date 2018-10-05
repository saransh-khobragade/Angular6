import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails = {
    fname:"",
    lname:"",
    dob:"",
    email:"",
    phone:0,
    gender:""
  }
  isSave=false
  userAlive: string;
  myForm2: FormGroup;

  constructor(private user: UserService, private auth: AuthService,private router:Router) {

    this.myForm2 = new FormGroup(
      {
      'firstname': new FormControl('',Validators.required),
      'lastname': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'confirmPassword': new FormControl('',Validators.required),
      'email': new FormControl('',[Validators.required]),
      'number': new FormControl('',Validators.required),
      'birthday': new FormControl('',Validators.required),
      'gender': new FormControl('Male',Validators.required),
      }
      );
   }

  ngOnInit() {
    this.auth.isUserExistsObservable.subscribe(data => {
      /* this.user.getUser(data).subscribe(data2 => {
        this.userDetails = data2;
        console.log(this.userDetails)
        this.myForm.setValue({
          firstname: data2.fname, 
          lastname: data2.lname,
          password:"",
          confirmPassword:"",
          email:data2.email,
          number:data2.phone,
          birthday:data2.dob,
          gender:data2.gender
        });
      }) */
    })
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
    return this.auth.isUserExists(control.value).subscribe(res=>{
      if(res.status==200 && !res.body.success) {
          var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(control.value) == true) 
          {
            control.setErrors(null)
          }
      }
      return res.body.success?null: { emailTaken: true };
    }
    );
   }

   changeSave(){
     this.isSave=!this.isSave
   }
   updateDetails(){
    this.user.updateUser(this.myForm.value.firstname,this.myForm.value.lastname, this.myForm.value.email, this.myForm.value.password, this.myForm.value.number, this.myForm.value.gender, this.myForm.value.birthday)
    .subscribe(res => {
      if (res.status == 200)
        console.log(res)
      else
      alert('not done')
    });
   }

}
