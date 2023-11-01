import { Injectable } from '@angular/core';

@Injectable()
export class CountdownService {
  public countdownFinished: boolean = false;

  getCountdownFinished(): boolean {
    return this.countdownFinished;
  }

  setCountdownFinished(): boolean {
    return (this.countdownFinished = true);
  }
}
