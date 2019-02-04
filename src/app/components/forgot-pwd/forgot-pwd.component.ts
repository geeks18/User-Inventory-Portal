import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {
  changePwdForm: FormGroup;
  resetForm:FormGroup
  error = '';
  pwdSuccess=false;
  cPwdSuccess=false;
  successMsg:String;
  rSubmitted=false;
  cSubmitted=false;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required]
    })
    this.changePwdForm = this.formBuilder.group({
      username: ['', Validators.required],
      authCode: ['', Validators.required],
      nPassword: ['', Validators.required]
    })
    

  }

  get cf() { return this.changePwdForm.controls; }
  get rf() { return this.resetForm.controls; }

  onSubmit() {
    this.cSubmitted = true;
    if (this.changePwdForm.invalid) {
      return;
    }

    

    this.auth.changePassword(this.cf.username.value,this.cf.authCode.value,this.cf.nPassword.value)
    .pipe().subscribe((data) => {
      if(data && data.body){

        if( data.body.statusCode==0){
          this.cPwdSuccess=true;
          this.successMsg="Password changed successfully";
          this.router.navigate(['login']);
        }
      }else{
        this.error="Error in changing password . Try again ."
        this.cPwdSuccess=false;
        this.router.navigate(['forgotPassword']);
      }
   

      }
    )

  }

  onReset() {

    this.rSubmitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.auth.resetPassword(this.rf.username.value)
      .pipe().subscribe((data) => {
        if (data.statusCode == 0) {

          this.pwdSuccess=true;
          this.successMsg="A code has been emailed to your emailId"

         
         
        }else{
          this.error="Error while sending code. Try after sometime. "
          this.pwdSuccess=false;
        }
     
        
      })




  }

}
