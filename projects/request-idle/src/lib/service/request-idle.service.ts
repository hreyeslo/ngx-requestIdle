import { Injectable, NgZone } from '@angular/core';
import 'requestidlecallback-polyfill';

import { RequestIdleOptions, FormatedRequestIdleOptions } from './request-idle.model';
import { AbstractRequestIdleService } from './abstract-request-idle.service';

@Injectable()
export class RequestIdleService implements AbstractRequestIdleService {

  constructor(private _ngZone: NgZone) { }

  // Public

  callback(cb: () => void, opt?: RequestIdleOptions): void {
    const { timeout, raf } = this._getOptions(opt);

    if (typeof window === 'undefined') {
      setTimeout(() => cb(), timeout);
    } else if (window.requestIdleCallback) {
      window.requestIdleCallback(() => this._ngZone.run(() => {
        if (raf) {
          this.requestAnimationFrame(() => cb());
        } else {
          cb();
        }
      }), {
        ...(timeout ? { timeout } : {}),
      });
    } else {
      this._ngZone.runOutsideAngular(() => {
        if (raf) {
          this.requestAnimationFrame(() => cb());
        } else {
          cb();
        }
      });
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
}
