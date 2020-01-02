import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: '';
  password: '';
  baseUrl = 'http://localhost:3000/api';
  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  /**
   * login
   */
  public login() {
    this.auth.login(this.email, this.password).subscribe(
      (response) => {
        setTimeout(() => {
          this.toastr.info(response.message, 'Welcome');
          localStorage.setItem('token', JSON.stringify(response.data.token));
          this.router.navigate(['/feedback']);
        }, 1000);
      }, (err) => {
        this.toastr.warning(err.error.message, err.error.data);
      });
  }
}
