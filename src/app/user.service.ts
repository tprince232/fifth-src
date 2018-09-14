import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { User} from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    url = 'http://localhost:3000/users';
    url2 = 'http://zetahau5.local/api/users';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(
        private http: HttpClient
    ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
            .pipe(
                catchError(this.onError('getUsers', []))
            );
    }

    createUser (user: User): Observable<User> {
        return this.http.post<User>(this.url, user, this.httpOptions).pipe(
          tap((user: User) => console.log(`added User w/ id=${user.id}`)),
          catchError(this.onError<User>('createUser'))
        );
      }

    private onError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

  }
