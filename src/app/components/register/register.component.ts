import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  constructor(

    private authenticationService: AuthenticationService,
    private formbuilder: FormBuilder

  ) {

    this.registrationForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],

    });

  }



  ngOnInit(): void {

  }



  Registration() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.registrationForm.valid) {
      this.authenticationService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          this.errorMessages.push(error.message || 'An error occurred during registration.');
        }
      });
    } else {
      this.errorMessages.push('Please fill in all required fields correctly.');
    }
  }





}
