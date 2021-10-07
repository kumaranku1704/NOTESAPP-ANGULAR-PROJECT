import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninOtpComponent } from './signin-otp/signin-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DigitonlyDirective } from './digitonly.directive';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import {MatDialogModule} from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { UtilityService } from './utility.service';
import { ErrorService } from './error.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner' 
import { NetworkInterceptor } from './network.interceptor';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from '../environments/environment';
import { NopagecomponentComponent } from './nopagecomponent/nopagecomponent.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectModule} from '@angular/material/select';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SigninOtpComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    DigitonlyDirective,
    EditFormComponent,
    CreateFormComponent,
    DialogComponent,
    NopagecomponentComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    NgOtpInputModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass : NetworkInterceptor,
    multi: true
  },UtilityService,
  ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
