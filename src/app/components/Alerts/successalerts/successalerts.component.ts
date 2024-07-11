import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-successalerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successalerts.component.html',
  styleUrl: './successalerts.component.css'
})
export class SuccessalertsComponent {

  isSuccess: boolean = true;
 

  title: string = 'Registration Successful';
  message: string = 'You have successfully registered!';


  // Method to simulate registration success or failure
  registerUser(success: boolean) {
    this.isSuccess = success;
    if (success) {
      this.title = 'Registration Successful';
      this.message = 'You have successfully registered!';
    } else {
      this.title = 'Registration Failed';
      this.message = 'There was an error in your registration. Please try again.';
    }
  }
}
