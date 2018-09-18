import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy{

    users: User[] = [];
    interval: any;

    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.getUsers(this)
        this.interval = setInterval(this.getUsers, 10000, this)
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }


    getUsers(comp: DashboardComponent) {
        comp.userService.getUsers()
            .subscribe(users => {
                comp.users = users;
                comp.users.sort((a,b) => {
                    if (!a.time) { return 1; }
                    else if (!b.time) { return -1; }
                    else if (a.time < b.time) { return -1; }
                    else { return 1; }
                });
            });
    }

    create() {
        this.router.navigate(['/create']);
    }

    checkUserMatch(user: User) {
        return (user.id === this.authService.getId())
    }

    getDivClass(user: User) {
        if (this.checkUserMatch(user)) {
            return {'btn-success': true};
        }
    }

    navigate(user: User) {
        if (this.checkUserMatch(user)) {
            this.router.navigate(['/view', user.id]);
        }
    }
}
