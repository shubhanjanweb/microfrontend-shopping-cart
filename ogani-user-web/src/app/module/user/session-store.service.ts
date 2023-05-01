import { Injectable } from '@angular/core';
import { OganiSessionStore, getOganiSession, saveOganiSession } from "@ogani/spa-shared-module";
import { Observable } from 'rxjs';

export class SessionStore extends OganiSessionStore { }
@Injectable()
export class SessionStoreService {

  getSessionStore(): SessionStore | null {
    return getOganiSession();
  }

  setSessionStore(val: SessionStore): Observable<boolean> {
    return new Observable(observer => {
      saveOganiSession(val);
      observer.next(true)
      observer.complete();
    });
  }

}
