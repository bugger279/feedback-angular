import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: any;
  public email: any;
  userResponse: Array<any> = [];

  constructor(private auth: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  public registration() {
    localStorage.removeItem('token');
    this.auth.register(this.name, this.email).subscribe(
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
