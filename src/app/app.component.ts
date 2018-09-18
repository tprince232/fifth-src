import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TimeService } from './time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = '3518 N Wilton';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.authService.checkUser();
    this.timeService.getStartTime();
  }

}
