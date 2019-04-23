import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
const TOKEN = 'TOKEN';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // remember the user credentials if he set rememberMe in previous login
  email: string = localStorage.getItem('email');
  password: string = localStorage.getItem('password');
  rememberMe: boolean;

  constructor(private service: AppService, private router: Router) { }

  // go for the login with latest credentials
  tryLogin() {
    this.service.login(this.email, this.password)
      .subscribe(r => {
        if (r.token) {
          // save current succussfull details of the user
          if (this.rememberMe) {
            localStorage.setItem('email', this.email);
            localStorage.setItem('password', this.password);
          }
          this.service.isUserLoggedIn = 'true';
          /* saving the user for session
          *  (he don't need to relogin to application once again for this browser tab)
          */
          sessionStorage.setItem('isUserLoggedIn', 'true');
          this.router.navigateByUrl('/orders');
        }
      }, error =>
        alert(error.error.error)
      );
  }

  // check the rememberMe checkbox
  addCheck(event: any) {
    this.rememberMe = event.target.checked ? true : false;
  }
}
