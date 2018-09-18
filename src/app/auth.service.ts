import {  Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    currentUser: User;

    constructor(
        private userService: UserService
    ) { }

    isAuthenticated() {
        if (!!this.currentUser) {
            return true;
        }
    }

    getId(): number {
        if (this.isAuthenticated()) {
            return this.currentUser.id;
        } else {
            return null;
        }
    }

    setUser(user: User) {
        localStorage.setItem('id', user.id.toString());
        this.currentUser = user;
    }

    checkUser() {
        console.log('in authservice init');
        if (localStorage.getItem('id')) {
            const id = localStorage.getItem('id');
            console.log('got id, ', id);
            this.userService.getUser(+id)
                .subscribe(user => this.currentUser = user);
        }
    }

    userFinished(): boolean {
        return this.currentUser.isDone === true;
    }
}
