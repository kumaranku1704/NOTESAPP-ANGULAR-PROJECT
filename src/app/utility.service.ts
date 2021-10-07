import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { AuthResponse } from './appInterfaces/auth-response.interface';
import { ErrorService } from './error.service';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  signUp_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Config.firebaseapikey}`;
  signIn_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Config.firebaseapikey}`;
  forgetPaasword_Url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${Config.firebaseapikey}`;

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

   loggedIn = new BehaviorSubject<boolean>(false);
  public readonly loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private _errorService: ErrorService,private firebaseAuth: AngularFireAuth) {}
  // in this function we are getting the zipcodeUrlApi
  getData() {
    return this.http.get(Config.zipcodeUrl);
  }
  
// we have made a signUp to post the email and password on signupurl and also its is catching error

  signUp(email: any, password: any) {
    return this.http
      .post<AuthResponse>(this.signUp_Url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          return this._errorService.handleError(err);
        })
      );
  }

  // / we have made a sign in to post the email and password on signInurl and also its is also catching error

  signIn(email: any, password: any) {
    return this.http
      .post<AuthResponse>(this.signIn_Url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          return this._errorService.handleError(err);
        })
      );
  }


   // / we have made a forgetpass in to post the email and password on forgetPaasword_Url and also its is also catching error
  forgetPass(email: any){
    return this.http.post<any>(this.forgetPaasword_Url,{
      requestType:"PASSWORD_RESET",    
      email:email,
      
    }).pipe(
      catchError( err =>{
        return this._errorService.handleError(err);
      })
    )
  }

  show(){
    this._loading.next(true);
  }

  hide(){
    this._loading.next(false);
  }

  AuthLogin() {
    return this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
   }
   
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
     localStorage.clear();

  }

  onUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(Config.img_upload_url, formData, { params: { key: Config.api_img_key } })
      .pipe(map((response) => response));

  }


}

