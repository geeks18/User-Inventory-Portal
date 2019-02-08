import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { SignIn } from '../types/signIn'
import { Token } from '../types/token'
import { User } from '../types/user'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): Token {

    return this.currentUserSubject.value;
  }




  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };
  get getAccessToken() {
    if (this.currentUserValue)
      return this.currentUserValue.AccessToken;
    else null;
  }
  get isLoggedIn() {
    if (this.currentUserSubject.value == null)
      return false;
    else
      return true;
  }






  logIn(username, password) {

    let userObject = {
      "email": username,
      "password": password
    }

    // post these details to API server return user info if correct

    return this.http.put<any>(environment.signIn, userObject, this.httpOptions).pipe(

      map(user => {

        // login successful 
        if (user && user.statusCode === 200) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUser() {

    const accessToken = this.getAccessToken;


    return this.http.put<any>(environment.getUserDetails,
      {
        accessToken
      },
      this.httpOptions).pipe(
        map(
          (response) => {
            return response;
          }));


  }


  saveUserDetails(user: User) {

    return  this.http.put<any>(environment.signUp, user, this.httpOptions).pipe(
      map(  (response) => {
        console.log(response);
          return response;
        }));
   

  }
  resetPassword(username: string) {

    let userObject = {
      "email": username
    }

    // post these details to API server return user info if correct

    return this.http.post<any>(environment.forgotPwd, userObject, this.httpOptions).pipe(

      map(resp => {

        // login successful 
        if (resp && resp.statusCode === 0) {
          console.log(resp.msg);
        }

        return resp;
      }));
  }

  changePassword(username: string,authcode:string,password:string) {
    
    let userObject = {
      "email": username,
      "password":password,
      "code":authcode
    }

    // post these details to API server return user info if correct

    return this.http.put<any>(environment.changePwd, userObject, this.httpOptions).pipe(

      map(resp => {

        // login successful 
        if (resp && resp.statusCode === 0) {
          console.log(resp.msg);
        }

        return resp;
      }));
  }


}
