import {  Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class TimeService {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    startTime: Date;
    currentTime: Date;
    interval: any;

    getStartTime() {
        this.userService.getStart()
          .subscribe(time => {
              if (time.start !== 0) {
                this.startTime = time.start;
                this.currentTime = new Date(Date.now() - time.start);
                this.currentTime.setHours(this.currentTime.getHours() - 18);
                console.log('about to set timeout, time is ', this.currentTime);
                this.interval = setInterval(this.addSecond, 1000, this);
            } else {
                this.currentTime = new Date();
                this.currentTime.setHours(0);
                this.currentTime.setMinutes(0);
                this.currentTime.setSeconds(0);
            }
          });
      }

    addSecond(service: TimeService) {
        service.currentTime = new Date(+service.currentTime + 1000);
    }

    setStart() {
        console.log('In setStart');
        this.userService.setStart()
            .subscribe(resp => {
                console.log('got:', resp);
            });
    }

    restart() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.startTime = null;
        this.currentTime = null;
        this.userService.restart()
            .subscribe(resp => {
                console.log('resart subscribed to: ', resp);
            });
    }
}
