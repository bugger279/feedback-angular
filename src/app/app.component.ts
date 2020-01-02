import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feedback-angular';
  constructor(public auth: AuthenticationService, private toastr: ToastrService) { }

  logout() {
    localStorage.removeItem('token');
    this.toastr.info('Logged out Successfully!', 'Logged');
    window.location.reload();
  }
}
