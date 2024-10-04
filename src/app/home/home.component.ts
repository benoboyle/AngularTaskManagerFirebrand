import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Ensure the correct 'styleUrls' field is used
})
export class HomeComponent {
  
  constructor(private router: Router) {}  // Inject the Router

  // Method to navigate to the sign-in page
  navigateToSignIn(): void {
    this.router.navigate(['/signin']);  // Navigates to the '/signin' route
  }
}
