import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { getAppInitStatus } from "@ogani/spa-shared-module";
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class UserCanLoadGuard implements CanLoad {
  constructor(private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {

    return getAppInitStatus().pipe(map(status => {
      if (status) {
        this.router.navigateByUrl('/dashboard/home');
      }
      return !status;
    }));

  }
}
