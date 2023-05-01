import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, take, takeUntil, tap, throwError } from 'rxjs';
import { UserReq } from './auth.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  validateUser(user: UserReq) {
    return this.http.post<any>('http://localhost:3000/auth/login', user).pipe(
      take(1),
      catchError(err => {
        return throwError(() => err.error?.message);
      }));
  }


  registerUser(user: UserReq) {
    return this.http.post<any>('http://localhost:3000/user/register', user).pipe(
      take(1),
      catchError(err => {
        return throwError(() => err.error?.message);
      }));
  }


}
