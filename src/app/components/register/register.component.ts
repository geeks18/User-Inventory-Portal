import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/types/user';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  signUpSuccess=false;
  signUpMsg:string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    let userObject = {
      "first_name": this.f.firstName.value,
      "last_name": this.f.lastName.value,
      "email": this.f.email.value,
      "password": this.f.password.value,
    }

    this.auth.saveUserDetails(userObject).pipe().subscribe((resp) => {
      if (resp && resp.body) { 
     
        if( resp.body.statusCode==3){
          this.signUpSuccess=false;
          this.loading=false;
          this.error="data validation failed . Password doesnot match policy"
        }
        if( resp.body.statusCode==2){
          this.signUpSuccess=false;
          this.loading=false;
          this.error="User already exists. Please check your email for confirmation of your code."
        }
        else if( resp.body.statusCode==1){
          this.signUpSuccess=false;
          this.loading=false;
          this.error="Error in Registration Process"
        }
        else if( resp.body.statusCode==0){
          this.signUpSuccess=true;
          this.signUpMsg="Congratulation your Registration is  successfull. Go ahead and login into he application"
        }
       
      } else {
        this.error="Error";

      }
    })

  }
}
