import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { User} from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(
        private http: HttpClient
    ) { }
  
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://zetahau5.local/api/users')
            .pipe(
                catchError(this.onError('getUsers', []))
            )
    }

    private onError<T>(operation: string, result: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

  }
