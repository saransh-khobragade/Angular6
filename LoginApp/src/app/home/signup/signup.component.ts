import { Component} from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray,FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  myForm:FormGroup;
  items:FormArray;
  genders=['male','female'];

  constructor(private formbuilder:FormBuilder,private auth:AuthService){

    this.myForm=formbuilder.group({
      'username': ['',[Validators.required]],
      'password': ['',[Validators.required]],
      'confirmpassword': ['',[Validators.required]],
      'email': ['',[Validators.required]],
      'number': ['',[Validators.required]],
      'birthday': ['',[Validators.required]],
      'gender': ["male"]
    })
  }

  onSubmit(){
    this.auth.registerUser(this.myForm.value.username,this.myForm.value.email,this.myForm.value.password,this.myForm.value.phone,this.myForm.value.gender,this.myForm.value.birthday)
    .subscribe(data=>console.log(data));
  }

  CustomValidation(component:FormControl){
   
    if(component.value==="Example")
    {return "anything";}

    else return null;

  }

  asyncValidator(control:FormControl):Promise<any> | Observable<any>   {
     
    const promise= new Promise<any>(
      (resolve,reject)=>{
        setTimeout(()=>{
            if(control.value==='Example'){
              console.log('hi');
              resolve({'invalid':true});
            }
            else{
              resolve(null);
            }
          },1500);
      }
    );
    return promise;
  }


}
