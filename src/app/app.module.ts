import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule } from '@angular/forms';
import { AuthService} from './auth.service';
import { AdminComponent } from './admin/admin.component';
import { TimeService } from './time.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateUserComponent,
    ViewUserComponent,
    AdminComponent
  ],

  providers: [ AuthService, TimeService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
