import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: any;
  public email: any;
  userResponse: Array<any> = [];
  registerForm: FormGroup;
  submitted = false;

  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/feedback']);
    }
  }

  get f() { return this.registerForm.controls; }

  public registration() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    localStorage.removeItem('token');
    this.auth.register(this.registerForm.get("name").value, this.registerForm.get("email").value).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success(response.message);
        setTimeout(() => {
          this.toastr.info('Please Login to view your feedback');
        }, 1000);
        this.name = '';
        this.email = '';
      },
      (err) => {
        this.toastr.warning('', err.error.message);
      }
    );
  }

}
