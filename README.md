<h1 align="center">ngx-request-idle</h1>
<p align="center">
This library is a set of utilities to improve the performance of Angular 2+ applications.
</p>

## Demo

You can see the real example in this [stackblitz](https://stackblitz.com/edit/request-idle-demo?file=src%2Fapp%2Fapp.module.ts)

## Installation instructions
Install `ngx-request-idle` from `npm`:
```bash
npm install ngx-request-idle

or

yarn add ngx-request-idle
```

Add needed package to NgModule imports:
```
import { RequestIdleModule } from 'ngx-request-idle';

@NgModule({
  ...
  imports: [RequestIdleModule.forRoot(),...]
  ...
})
```

## Content

This package contains a service and a custom preload strategy.

- RequestIdle (service)

  * callback() -> Queues a function to be called during a browser's idle periods.
  * requestAnimationFrame() -> this method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.

- RequestIdlePreloadAllModules (Preload Strategy)

  * This strategy combines the 2 methods of the requestidle service to ensure a preload without blockages

## Usage

##### requestIdleCallback
```bash
import { RequestIdle } from 'ngx-request-idle';
...
export class AppComponent implements OnInit {
  ...
  constructor(private _requestIdle: RequestIdle) { }

  ngOnInit() {
    this._requestIdle.callback(() => { // Whatever you need });
  }
  ...
}
```

##### requestAnimationFrame
```bash
import { RequestIdle } from 'ngx-request-idle';
...
export class AppComponent implements OnInit {
  ...
  constructor(private _requestIdle: RequestIdle) { }

  ngOnInit() {
    this._requestIdle.requestAnimationFrame(() => { // Whatever you need });
  }
  ...
}
```

##### RequestIdlePreloadAllModules
```bash
import { RequestIdlePreloadAllModules } from "ngx-request-idle";
...
imports: [
  RouterModule.forRoot(routes, {
    // Custom strategy to improve performance when loading lazy-load modules
    preloadingStrategy: RequestIdlePreloadAllModules
  }),
  ...
]
...
```
