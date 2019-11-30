import { NgModule, NgZone, ModuleWithProviders } from '@angular/core';

import { AbstractRequestIdleService } from './service/abstract-request-idle.service';
import { RequestIdleService } from './service/request-idle.service';

@NgModule()
export class RequestIdleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RequestIdleModule,
      providers: [
        {
          provide: AbstractRequestIdleService,
          useClass: RequestIdleService,
          deps: [NgZone]
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: RequestIdleModule,
      providers: [
        {
          provide: AbstractRequestIdleService,
          useClass: RequestIdleService,
          deps: [NgZone]
        }
      ]
    };
  }
}
