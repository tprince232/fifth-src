import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { TimeService } from '../time.service';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {

    user = new User();


    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private timeService: TimeService
    ) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
            .subscribe(user => this.user = user);
    }

    submit() {
        this.user.time = this.timeService.currentTime;
        this.user.isDone = true;
        console.log('In submit, ', this.user);
        this.userService.putUser(this.user)
            .subscribe(user => {
                console.log('got:', user);
                this.router.navigate(['/dashboard']);
            });

    }

    return() {
        this.router.navigate(['/dashboard']);
    }

}
