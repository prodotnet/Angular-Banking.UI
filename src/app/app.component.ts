import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthenticationService } from './components/authentication.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, FooterComponent, HomeComponent, HeaderComponent]
})
export class AppComponent implements OnInit {

constructor(private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.reFreshUser();
  }
  private  reFreshUser(){
    const jwt = this.authenticationService.getJwt();
    
    if(jwt){
      this.authenticationService.RefreshPage(jwt).subscribe({
        next: _ =>{},
        error: _ =>{
          this.authenticationService.Logout();
        },

      })
    }else{
      this.authenticationService.RefreshPage(null).subscribe();
    }
  }
 
}


