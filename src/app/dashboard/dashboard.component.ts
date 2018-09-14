import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  
    users: User[] = [];

    constructor(
        private userService: UserService
    ) {}

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }
  

}