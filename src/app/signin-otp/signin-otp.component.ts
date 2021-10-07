import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-signin-otp',
  templateUrl: './signin-otp.component.html',
  styleUrls: ['./signin-otp.component.css'],
})
export class SigninOtpComponent implements OnInit {
  
  mysigninOtpForm!: FormGroup;
  randomNumber!: string;
  showSubmitBtn:boolean=true;
  showConfirmSection: boolean = false;
  Phonenumber:any = '';
  userEmail:any = '';
  otp!: string;
  showOtpComponent = true;
  showEmail:boolean=false;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };


  constructor(private router:Router,private _utilityService:UtilityService) {}

  ngOnInit(): void {
   
    this.mysigninOtpForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      mobileno: new FormControl(null,Validators.required),
    })

  }
  

  // this function is used for generting the OTP
  generateOtp() {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    this.randomNumber = randomOtp.toString();
    alert(this.randomNumber);
    this.showConfirmSection = true;
  }

  // this function is used fot checking the OTP if it same or not if it is same then the user will ber navigated to dashboard
  SubmitOtp() {
    if (this.otp == this.randomNumber) {
      this._utilityService.show();
      localStorage.setItem('useremail',this.userEmail);
      localStorage.setItem('login','true');
      this._utilityService.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
      this._utilityService.hide();
      this.showConfirmSection = false;
      
    } else {
      alert('OTP is not valid');
    }
  }  

  
// this function is used to disable the submit buttton when its length is greater than 3
  onOtpChange(otp:string) {

    this.otp = otp;
    if(this.otp.length > 3){
      this.showSubmitBtn = false;
    }
    else{
      this.showSubmitBtn = true;
    }
  }

  

 
}
