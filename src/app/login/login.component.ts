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

  email: string = localStorage.getItem('email');
  password: string = localStorage.getItem('password');

  rememberMe: boolean;
  constructor(private service: AppService, private router: Router) {
  }

  tryLogin() {
    if (this.rememberMe) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    }
    this.service.login(this.email, this.password)
      .subscribe(r => {
        if (r.token) {
          this.service.isUserLoggedIn = 'true';
          sessionStorage.setItem('isUserLoggedIn', 'true');
          this.router.navigateByUrl('/orders');
        }
      }, error =>
        alert(error.error.error)
      );
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
