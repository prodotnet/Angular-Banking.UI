import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authenticationService: AuthenticationService, ) {}
  logout(){
    this.authenticationService.Logout();
  }
  
  
}
