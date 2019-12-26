import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AbstractRequestIdleService } from '../service/abstract-request-idle.service';

@Injectable()
export class RequestIdlePreloadAllModules implements PreloadingStrategy {
  constructor(private _reuqestIdleService: AbstractRequestIdleService) { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    this._reuqestIdleService.callback(() => load());
    return of(null);
  }
}
