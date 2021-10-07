import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorService } from '../error.service';

import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  mySignupForm!: FormGroup;
  zipCodeArray: any = [];
  // num: number = 226022;
  showZipCode: boolean = false;
  zipValue!: number;
  temp: any = '';
  error_msg!: string;
  errMsgs = this._errorService.errorsMsgs;

  constructor(
    private _utilityservice: UtilityService,
    private route: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.mySignupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstname: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      zip: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });
    this.getInitialData();
  }

  // this functon is used for subscribing the values which we are getting from UtilityService getData() fun
  getInitialData() {
    this._utilityservice.getData().subscribe((response) => {
      this.zipCodeArray = response;

      // this.zipCodeArray.filter((item:any)=>{
      //
      // })
    });
  }

  // this is used to filter the zipcodeArray if zipvalue is greater than 5 and its values is in that array
  changeZipCode() {
    if (this.zipValue.toString().length > 5) {
      this._utilityservice.show();
      this.zipCodeArray.filter((item: any) => {
        if (Object.keys(item)[0] == this.zipValue.toString()) {
          this.temp = JSON.parse(JSON.stringify(Object.values(item)[0]));
          this.setValue();
        }
      });
    } else {
      this.resetValue();
    }
  }

  // this function is used for setting the values of country state and city when zipcode value is from the zipcode array
  setValue() {
    this.mySignupForm.patchValue({
      country: this.temp.country,
      state: this.temp.state,
      city: this.temp.city,
    });
    this._utilityservice.hide();
  }

  // this is used for resetting the values
  resetValue() {
    this.mySignupForm.patchValue({
      country: '',
      state: '',
      city: '',
    });
  }

  // this function is used for Subscribing the values from UtilityService signup function
  submitForm() {
    if (
      this.mySignupForm.value.password ==
      this.mySignupForm.value.confirmPassword
    ) {
      //  this.route.navigate(['dashboard']);

      this._utilityservice
        .signUp(this.mySignupForm.value.email, this.mySignupForm.value.password)

        .subscribe(
          (response) => {
            this.route.navigate(['/']);
          },

          (err) => {
            console.log(err);
            this.error_msg = this.errMsgs[err];
          }
        );
    } else {
      alert('Password and Confirm Password are not Matching');
    }
  }
}
