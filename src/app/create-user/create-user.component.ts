import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

    user = new User();


    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // this.userService.getUsers()
         //   .subscribe(users => this.users = users);
    }

    create() {
        console.log('In create, ', this.user);
        this.userService.createUser(this.user)
            .subscribe(user => {
                console.log('got:', user);
                this.authService.setUser(user);

                this.router.navigate(['/dashboard']);
            });

    }


}
