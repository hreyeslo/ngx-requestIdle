import { Injectable } from '@angular/core';

import { RequestIdleOptions } from './request-idle.model';

@Injectable()
export abstract class AbstractRequestIdleService {
  abstract callback(cb: () => void, opt?: RequestIdleOptions): void;
  abstract requestAnimationFrame(cb: () => void): void;
}
