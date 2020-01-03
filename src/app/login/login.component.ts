import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  email: '';
  password: '';
  baseUrl = 'http://localhost:3000/api';
  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/feedback']);
    }
  }
  get f() { return this.loginForm.controls; }
  /**
   * login
   */
  public login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.login(this.loginForm.get("email").value, this.loginForm.get("password").value).subscribe(
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
