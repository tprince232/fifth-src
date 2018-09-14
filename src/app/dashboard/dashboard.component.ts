import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  
    users: User[] = [];

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }

    create() {
        this.router.navigate(['/create']);
    }
}
