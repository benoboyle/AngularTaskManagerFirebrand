import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  firstName: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;

  // Add the properties for handling username error
  usernameError: boolean = false;
  usernameErrorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}  // Inject UserService
  

  onSubmit() {
    // Check if passwords match
    console.log('Form Submitted');
    if (this.password !== this.confirmPassword) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
      
    

      // Create a new user object
      const newUser = {
        firstName: this.firstName,
        username: this.username,
        password: this.password
      };

      this.userService.registerUser(newUser).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 409) {
            // Handle conflict (duplicate username)
            this.usernameError = true;
            this.usernameErrorMessage = 'Username is already taken.';
            alert(this.usernameErrorMessage);  // Show pop-up message
          } else {
            console.error('Error registering user:', error);
            alert('There was an error processing your request. Please try again.');
          }
        }
      );
    }
  }
}
