import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myLoginForm!: FormGroup;
  error_msg!: string;
  errMsgs = this._errorService.errorsMsgs;
  isActive =true;
  

  constructor(
    private _utilityservice: UtilityService,
    private router: Router,
    private _errorService: ErrorService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.myLoginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email] ),
      password: new FormControl(null, Validators.required),
    });
    this.myLoginForm.reset();
    if (localStorage.getItem('login') == 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  // we have made a function submitForm() in this function we are subscribeing the value from service signin function

  submitForm() {
    this._utilityservice
      .signIn(this.myLoginForm.value.email, this.myLoginForm.value.password)

      .subscribe(
        (response) => {
          
          localStorage.setItem('useremail', this.myLoginForm.value.email);
          localStorage.setItem('login', 'true');
          this.error_msg = '';
          this._utilityservice.loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.log(err);
          this.error_msg = this.errMsgs[err];
        }
      );
  }

  // we have made this function for googleauthetenciation of email address if email id is valide then we are navigating them to dashboard page 
  googleAuth() {
    this._utilityservice
      .AuthLogin()
      .then((result: any) => {
        const email = result['user'].email;
        
        localStorage.setItem('useremail', email);
        localStorage.setItem('login', 'true');
        this._utilityservice.loggedIn.next(true);
        this.zone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
    password_show_hide(){
      this.isActive =!this.isActive;
    }
  
}
