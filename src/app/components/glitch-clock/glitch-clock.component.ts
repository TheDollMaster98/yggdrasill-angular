import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-glitch-clock',
  templateUrl: './glitch-clock.component.html',
  styleUrls: ['./glitch-clock.component.scss'],
})
export class GlitchClockComponent implements OnInit, OnDestroy {
  targetDate: Date; // La data a cui fare il conto alla rovescia
  remainingTime: number = 10; // Il tempo rimanente in secondi
  timer: any; // Il timer

  constructor() {
    // Imposta la data di destinazione (esempio: 10 minuti dalla data corrente)
    this.targetDate = new Date();
    this.targetDate.setMinutes(this.targetDate.getMinutes() + 10);
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = this.targetDate.getTime() - currentTime;

      if (timeDifference <= 0) {
        this.remainingTime = 0;
        this.stopTimer();
      } else {
        this.remainingTime = Math.floor(timeDifference / 1000); // Converti in secondi
      }
    }, 1000); // Aggiorna il timer ogni secondo
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padNumber(minutes)}:${this.padNumber(remainingSeconds)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
}
