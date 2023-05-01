import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { SessionStoreService } from './session-store.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(private userSrvc: UserService, private sessionStorage: SessionStoreService) { }

  signin(val: UserReq) {
    return this.userSrvc.validateUser(val).pipe(switchMap(res => {
      if (res.accessToken) {
        return this.sessionStorage.setSessionStore({
          accessToken: res.accessToken,
          fullName: res.userDetails.fullName,
          photoUrl: res.userDetails.photoUrl,
          userName: res.userDetails.userName
        }).pipe(switchMap(done => {
          if (done) {
            return of({
              status: true,
              message: 'Successfully logged in.'
            });
          } else {
            return of(this.handleError('Internal Server error occured'));
          }
        }))
      } else {
        return of(this.handleError('Internal Server error occured'));
      }
    }), catchError(msg => {
      return of(this.handleError(msg));
    }));
  }

  private handleError(msg: string) {
    return {
      status: false,
      message: msg
    }
  }
}

export interface UserReq {
  userName: string;
  password: string;
}
