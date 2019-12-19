import { Injectable, NgZone } from '@angular/core';

import { AbstractRequestIdleService } from './abstract-request-idle.service';
import { FormatedRequestIdleOptions, RequestIdleOptions } from './request-idle.model';

@Injectable()
export class RequestIdleService implements AbstractRequestIdleService {

  constructor(private _ngZone: NgZone) { }

  // Public

  callback(cb: () => void, opt?: RequestIdleOptions): void {
    const win: any = window;
    const { timeout, raf } = this._getOptions(opt);

    if (typeof win === 'undefined') {
      setTimeout(() => cb(), timeout);
    } else if (win.requestIdleCallback) {
      win.requestIdleCallback(() => this._ngZone.run(() => this._runCallback(cb, raf)), {
        ...(timeout ? { timeout } : {}),
      });
    } else {
      this._ngZone.runOutsideAngular(() => this._runCallback(cb, raf));
    }
  }

  requestAnimationFrame(cb: () => void): void {
    const win: any = window;
    const requestAnimationFrame = win.requestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.webkitRequestAnimationFrame ||
      win.msRequestAnimationFrame;

    if (requestAnimationFrame) {
      requestAnimationFrame(() => cb());
    } else {
      cb();
    }
  }

  // Private

  _getOptions(opt: RequestIdleOptions): FormatedRequestIdleOptions {
    const timeout = typeof (opt || {}).timeout !== 'number' ? 0 : opt.timeout;
    const raf = !!(typeof (opt || {}).requestAnimationFrame !== 'boolean' ? true : opt.requestAnimationFrame);
    return { timeout, raf };
  }

  _runCallback(cb: () => void, raf: boolean): void{
    if (raf) {
      this.requestAnimationFrame(() => cb());
    } else {
      cb();
    }
  }
}
