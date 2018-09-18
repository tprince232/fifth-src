import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { User} from './user.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    host = 'http://localhost:3000'
    url = this.host + '/users';
    url2 = 'http://zetahau5.local/api/users';
    timeUrl = this.host + '/time';

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

    getUser(id: number): Observable<User> {
        const idUrl = `${this.url}/${id}`;
        return this.http.get<User>(idUrl)
            .pipe(
                tap(_ => console.log('got hero with id ', id)),
                catchError(this.onError<User>('getUser: ' + id))
            );
    }

    createUser (user: User): Observable<User> {
        return this.http.post<User>(this.url, user, this.httpOptions).pipe(
          tap((user: User) => console.log(`added User w/ id=${user.id}`)),
          catchError(this.onError<User>('createUser'))
        );
      }

    putUser(user: User) {
        const idUrl = `${this.url}/${user.id}`;
        return this.http.put(idUrl, user, this.httpOptions).pipe(
            catchError(this.onError('putUser'))
        );
    }

    private onError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    setStart() {
        const time = Date.now();
        const timeObj = {'start': time};
        console.log('in set start', timeObj);
        return this.http.put(this.timeUrl, timeObj, this.httpOptions)
            .pipe(
                tap((resp) => console.log('put returned', resp)),
                catchError(this.onError('setStart'))
            );
    }

    restart() {
        const timeObj = {'start': 0};
        console.log('in set start', timeObj);
        return this.http.put(this.timeUrl, timeObj, this.httpOptions)
            .pipe(
                tap((resp) => console.log('put returned', resp)),
                catchError(this.onError('setStart'))
            );
    }

    getStart(): Observable<any> {
        const timeUrl = this.host + '/time';
        return this.http.get<any>(timeUrl, this.httpOptions)
            .pipe(
                tap((resp) => console.log(resp)),
                catchError(this.onError<Date>('setStart'))
            );
    }

    delete(id: number) {
        const idUrl = `${this.url}/${id}`;
        return this.http.delete(idUrl, this.httpOptions).pipe(
            catchError(this.onError('deleteUser'))
        );
    }

  }
