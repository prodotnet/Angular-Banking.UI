import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/UserRegistration';
import { environment } from '../../environments/environment.development';
import { UserLogin } from '../models/UserLogin';
import { UserDTO } from '../models/UserDTO';
import { map, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_URL = `${environment.appUrl}/api/Authentication`;
  
  private userSource = new ReplaySubject<UserDTO|null >(1);
  
  //uses$ to subscribe to the observer
  user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
 

  RefreshPage(jwt:string | null){
    if(jwt ===null){
      this.userSource.next(null);
      return of(undefined);
    }

    let headers =new HttpHeaders();
    headers = headers.set('Authorization','Bearer  ' + jwt);

    return this.http.get<UserDTO>(`${this.API_URL}/UserToken`, {headers}).pipe(
      map((user :UserDTO)=>{

        if(user){
          this.setUser(user);
        }
       
      })

    )

  }

  Login(model: UserLogin) {


    return this.http.post<UserDTO>(`${this.API_URL}/Login`, model).pipe(
      map((user :UserDTO)=>{

        if(user){
          this.setUser(user);
        }
       
      }),
      
    );

  }

  Logout(){
    localStorage.removeItem(environment.userkey);
    this.userSource.next(null)
   this.router.navigateByUrl('/');
  }

  register(model: UserRegistration) {


    return this.http.post(`${this.API_URL}/Register`, model)
     
  }


  getJwt() {
    const key = localStorage.getItem(environment.userkey);
  
    if (key) {
        const user: UserDTO = JSON.parse(key);
        return user.jwt; // Ensure Jwt exists
    } else {
      return null;
    }
  }


   private setUser(user:UserDTO){
    localStorage.setItem(environment.userkey,JSON.stringify(user));
    
    //thiw will tell the if the user has login or not
    this.userSource.next(user);

  
   }
}