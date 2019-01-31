import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../types/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
 
  public isLoading:boolean = false;
  
  constructor(private auth: AuthService) { }
  users= new User;
  message="Profile Details";
  ngOnInit() {
    this.isLoading=true;//show loading text
    if (this.auth.isLoggedIn === true) {
      this.auth.getUser().pipe().subscribe((resp) => {
        if (resp && resp.body && resp.body.msg) {
          resp.body.msg.UserAttributes.map(element => {
           
            if(element.Name === "given_name"){
            
              this.users.first_name=element.Value;
            }
            if(element.Name === 'family_name'){
              this.users.last_name=element.Value;
            }
            if(element.Name === 'email'){
              this.users.email=element.Value;
            }
          });
         

        } else {
          console.log('error');

        }
        this.isLoading=false;
      })
    }else{
      this.message='Sorry you are not logged In';
      this.isLoading=false;
    }
  

  }

}
