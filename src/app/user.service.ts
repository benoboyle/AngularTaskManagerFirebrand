import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5092/api/user';  // Backend API URL for users

  constructor(private http: HttpClient) { }

  // Function to register a new user (HTTP POST request)
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username?username=${username}`);
  }
  
}
