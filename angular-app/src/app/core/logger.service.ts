import { Injectable, Inject } from '@angular/core';

interface LoggingFunction {
  (value: any): void;
}
export interface Logger {
  info: LoggingFunction;
  log: LoggingFunction;
  warn: LoggingFunction;
  error: LoggingFunction;
}

@Injectable({ providedIn: 'root' })
export class LoggerService implements Logger {
  constructor(@Inject('env') private env) {}

  info(value: any): void {
    if (!this.env.heroion) {
      console.info(value);
    } else {
      // App Insights or your favorite service
    }
  }

  log(value: any): void {
    if (!this.env.heroion) {
      console.log(value);
      // console.log(`%c${value}`, `color:blue`);
    } else {
      // App Insights or your favorite service
    }
  }

  warn(value: any): void {
    if (!this.env.heroion) {
      console.warn(value);
    } else {
      // App Insights or your favorite service
    }
  }

  error(value: any): void {
    if (!this.env.heroion) {
      console.error(value);
    } else {
      // App Insights or your favorite service
    }
  }
}
