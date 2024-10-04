import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { catchError } from 'rxjs/operators'; // For error handling
import { throwError } from 'rxjs'; // For error handling
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SigninComponent {
  username: string = '';  // Updated to username instead of email
  password: string = '';
  rememberMe: boolean = false;
  

  constructor(private router: Router, private http: HttpClient) {} // Inject HttpClient

  onSignIn() {
    console.log('Username:', this.username); // Check the value of username
    console.log('Password:', this.password); // Check the value of password
  
    const loginData = {
      username: this.username,
      password: this.password
    };
  
    // Check the login data object being sent
    console.log('Login data:', loginData);
  
    this.http.post('http://localhost:5092/api/user/login', loginData)
      .pipe(
        catchError((error) => {
          console.error('Login failed:', error);
          alert('Invalid username or password');
          return throwError(error); // Re-throw the error
        })
      )
      .subscribe((response: any) => {
        console.log('Login successful:', response);

        // Store the username in localStorage
        localStorage.setItem('username', this.username);

        this.router.navigate(['/home']);
      });
  }
  

  navigateToRegister() {
    this.router.navigate(['/user']); // Navigate to the user component
  }
}
