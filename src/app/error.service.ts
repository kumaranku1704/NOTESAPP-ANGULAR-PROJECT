import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {}

  errorsMsgs:any = {
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password",
    USER_DISABLED: "The user account has been disabled by an administrator",
    EMAIL_EXISTS: "The email address is already in use by another account",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project",
  }
  
  // we have made a function handleError which is returning error
  handleError(err:HttpErrorResponse){
    return throwError(err.error.error.message)
  }
}
