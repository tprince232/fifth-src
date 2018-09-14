import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'create', component: CreateUserComponent},
    // {path: 'user/:id', component: EventDetailsComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
