import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateFormComponent } from './create-form/create-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NopagecomponentComponent } from './nopagecomponent/nopagecomponent.component';
import { SigninOtpComponent } from './signin-otp/signin-otp.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'signinotp',component:SigninOtpComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'editform',component:EditFormComponent,canActivate:[AuthGuard]},
  {path:'createform',component:CreateFormComponent,canActivate:[AuthGuard]},
  {path:'**',component:NopagecomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
