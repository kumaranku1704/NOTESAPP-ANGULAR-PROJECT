import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { ErrorService } from '../error.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  myForgotForm!: FormGroup;
  password: any = '';
  Confirmpassword: any = '';
  
  success: boolean = false;
  error_msg!: string;
  errMsgs = this._errorService.errorsMsgs;

  constructor(private _utilityservice: UtilityService, private route: Router,private _errorService:ErrorService) {}

  ngOnInit(): void {
    this.myForgotForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email])
      
    });
  }


  // we have made a function forgetPaasword() in this function we are subscribeing the value from service forgetpass function 

  forgetPassword(){
    this._utilityservice.forgetPass(this.myForgotForm.value.email).subscribe(res=>{
   
      this.success=true;
      this.error_msg='';
    },err=>{
      console.log(err);
      this.error_msg =this.errMsgs[err];
      this.success=false;
    })

  }

}
