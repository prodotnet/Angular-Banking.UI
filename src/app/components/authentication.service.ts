import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/UserRegistration';
import { environment } from '../../environments/environment.development';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  register(model : UserRegistration){

    return this.http.post(`${environment.appUrl}/api/Authentication/Register`,model)
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
