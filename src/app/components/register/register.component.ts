import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';
import { ValidationsComponent } from "../validations/validations.component";



declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ValidationsComponent]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  submitted = false;
  isRegistered = false;
  isRegistrationFailed = false;
  isLoading = false;
  errorMessages: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.formInitialization();

  }

  formInitialization() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  Registration() {
    this.submitted = true;
    this.isLoading = true;
    this.errorMessages = [];

   // if (this.registrationForm.valid) {}
      this.authenticationService.register(this.registrationForm.value).subscribe({
        next: (reponse) => {
          console.log(reponse);
          this.isRegistered = true;
          this.isRegistrationFailed = false;
          this.isLoading = false;

        },
        error: error => {
          console.log(error);
          this.isRegistrationFailed = true;
          this.isRegistered = false;
          this.isLoading = false;

          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {

            this.errorMessages.push(error.error);
          }

        },
        complete: () => {
          // Open the modal
          const modalElement = document.getElementById('registrationModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();


          }
        }

      });
    
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

}



