import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        console.log('AuthGuard#canActivate called');
        console.log(route);
        if (route.params.id != this.authService.getId()) {
            return false;
        } else if (this.authService.userFinished()) {
            return false;
        }
        return true;
    }
}
