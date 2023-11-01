import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-glitch-clock',
  templateUrl: './glitch-clock.component.html',
  styleUrls: ['./glitch-clock.component.scss'],
})
export class GlitchClockComponent implements OnInit {
  countdownTime: string | undefined = '99:99:99:99';
  endDate: Date = new Date('2023-11-11T11:11:11');
  showComingSoonMessage: boolean = false;

  ngOnInit() {
    this.updateCountdown();

    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const currentTime = new Date();
    const timeDifference = this.endDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      this.countdownTime = '00:00:00:00';
      this.showComingSoonMessage = true;
    } else {
      const days = Math.floor(timeDifference / (24 * 3600 * 1000));
      const hours = Math.floor(
        (timeDifference % (24 * 3600 * 1000)) / (3600 * 1000)
      );
      const minutes = Math.floor(
        (timeDifference % (3600 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      this.countdownTime = `${this.formatTimeUnit(days)}:${this.formatTimeUnit(
        hours
      )}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
    }
  }

  formatTimeUnit(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }
}
