import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';
import { ValidationsComponent } from '../validations/validations.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule,ValidationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  isRegistered = false;
  isLoading = false;
  errorMessages: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }



  ngOnInit(): void {
    this.formInitialization();

  }
  formInitialization() {
    this.loginForm = this.formBuilder.group({

      email: ['', Validators.required,],
      password: ['', Validators.required],
    });
  }




  Login() {
    this.submitted = true;
    this.isLoading = true;
    this.errorMessages = [];


    



    this.authenticationService.Login(this.loginForm.value).subscribe({
      next: (reponse) => {
        console.log(reponse);
        this.isRegistered = true;
        this.isLoading = false;


      },
      error: error => {
        console.log(error);

        this.isRegistered = false;
        this.isLoading = false;

        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {

          this.errorMessages.push(error.error);
        }

      },


    });
 
  }

}







