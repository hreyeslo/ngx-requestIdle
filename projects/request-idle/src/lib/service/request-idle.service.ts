import { Injectable, NgZone } from '@angular/core';
import 'requestidlecallback-polyfill';

import { RequestIdleOptions } from './request-idle.model';

@Injectable()
export class RequestIdleService {

  constructor(private _ngZone: NgZone) { }

  callback(cb: () => void, opt?: RequestIdleOptions): void {
    const timeout = typeof (opt || {}).timeout !== 'number' ? 0 : opt.timeout;
    const raf = !!(typeof (opt || {}).requestAnimationFrame !== 'boolean' ? true : opt.requestAnimationFrame);

    if (typeof window === 'undefined') {
      setTimeout(() => cb(), timeout);
    } else if (window.requestIdleCallback) {
      window.requestIdleCallback(() => this._ngZone.run(() => this._requestAnimationFrame(() => cb(), raf)), {
        ...(timeout ? { timeout } : {}),
      });
    } else {
      this._ngZone.runOutsideAngular(() => this._requestAnimationFrame(() => cb(), raf));
    }
  }

  _requestAnimationFrame(cb: () => void, useRaf: boolean): void {
    const win: any = window;
    const requestAnimationFrame = win.requestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.webkitRequestAnimationFrame ||
      win.msRequestAnimationFrame;

    if (requestAnimationFrame && useRaf) {
      requestAnimationFrame(() => cb());
    } else {
      cb();
    }
  }
}
