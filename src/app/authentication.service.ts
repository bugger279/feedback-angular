import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginInfo {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;
  baseUrl = 'http://localhost:3000/api';
  // baseUrl = 'https://4e00178d.ngrok.io/api';
  constructor(private http: HttpClient) { }

  // Get User Details from token
  getuserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /**
   * login
   */
  public login(email, password): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  /**
   * get Feedback
   */
  public getFeedback(): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    // Getting Token Issues
    return this.http.get(`${this.baseUrl}/feedback`, {
      headers: {
        'token': `${token}`
      }
    });
  }

  /**
   * fetchIds
   */
  public fetchIds(): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    // Getting Token Issues
    return this.http.get(`${this.baseUrl}/fetchIds`, {
      headers: {
        'token': `${token}`
      }
    });
  }

  /**
   * giveYourReview
   */
  public giveYourReview(receiver_id, feedback_data): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    const headers = new HttpHeaders({ 'token': token });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/feedback`, { receiver_id, feedback_data }, options);
  }

  /**
   * register
   */
  public register(name, email): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email });
  }

  // Get Token From Local Storage
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  /**
   * isLoggedIn
   * To Check If User is logged in or not to activate route
   */
  public isLoggedIn(): boolean {
    const user = this.getuserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
