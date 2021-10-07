import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finalproject';
  username: any | null;
  showContent:boolean = false;

  mode: ProgressSpinnerMode = 'indeterminate';
  loading$ = this._utilityService.loading$;
  loggedIn$ = this._utilityService.loggedIn$;

  constructor(private _utilityService: UtilityService, private router: Router) {
     this.loggedIn$.subscribe(res =>{
       
       this.showContent=res;
       this.username = localStorage.getItem('useremail');
     });
    if (
      localStorage.getItem('usermail') != '' &&
      localStorage.getItem('useremail') != null
    ) {
      
      this._utilityService.loggedIn.next(true);
      } else {
      this._utilityService.loggedIn.next(false);
    }
  }
  ngOnInit(): void {
    // this.username = localStorage.getItem('useremail').toString();
  }
 
  // this function is used to show utlilityService
  openConfirmationDialog() {
    this._utilityService.show();
  }
  
  // this function is used for hiding the utilityservice
  closeConfirmationDialog() {
    this._utilityService.hide();
  }
  
  // this function used to user make user logout
  logout() {
    this._utilityService.logout();
    this._utilityService.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
