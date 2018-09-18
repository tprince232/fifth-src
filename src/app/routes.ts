import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AdminComponent } from './admin/admin.component';
import { Routes } from '@angular/router';
import { AuthGuard} from './auth-guard.service';

export const appRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'create', component: CreateUserComponent},
    {path: 'view/:id', component: ViewUserComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
