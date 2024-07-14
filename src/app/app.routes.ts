import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes =
    [
        { path: '',component: HomeComponent},
        { path: 'login',component: LoginComponent}, 
        {path: 'register',component: RegisterComponent},
        {path: 'dashboard',component: DashboardComponent},
        { path: 'NotFound',component: NotFoundComponent},
        { path: '**',component: NotFoundComponent ,pathMatch: 'full'} ,
        
    ];
    