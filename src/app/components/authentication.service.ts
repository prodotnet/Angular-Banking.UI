import { HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/UserRegistration';
import { environment } from '../../environments/environment.development';
import { UserLogin } from '../models/UserLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_URL = `${environment.appUrl}/api/Authentication`;

  constructor(private http: HttpClient) { }


  Login(model: UserLogin) {


    return this.http.post(`${this.API_URL}/Login`, model)
     
  }


  register(model: UserRegistration) {


    return this.http.post(`${this.API_URL}/Register`, model)
     
  }

  
}