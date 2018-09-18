import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { TimeService } from '../time.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    users: User[] = [];

    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private timeService: TimeService
    ) {}

    ngOnInit() {
        this.userService.getUsers()
        .subscribe(users => {
            this.users = users;
        });
    }

    setStart() {
        this.timeService.setStart();
    }

    restart() {
        this.timeService.restart();
    }

    set(user: User) {
        this.authService.setUser(user);
    }

    delete(user) {
        this.userService.delete(user.id)
        .subscribe(resp => console.log('delete ', resp));
    }

}
