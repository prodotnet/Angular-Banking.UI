import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';
import { ValidationsComponent } from "../validations/validations.component";


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
    private formBuilder: FormBuilder
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
    this.errorMessages=[];


    if(this.registrationForm.valid){}
      this.authenticationService.register(this.registrationForm.value).subscribe({
        next:(reponse)=>{
          console.log(reponse);
        },
        error:error=>{
          if(error.error.error){
            this.errorMessages=error.error.error;
          }
         
        }
      })
      
    
    
  }
}
