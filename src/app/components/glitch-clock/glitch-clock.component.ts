import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-glitch-clock',
  templateUrl: './glitch-clock.component.html',
  styleUrls: ['./glitch-clock.component.scss'],
})
export class GlitchClockComponent implements OnInit {
  @Input() days: number | undefined;
  countdownTime: string | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    // Recupera il conto alla rovescia memorizzato in localStorage
    const storedCountdown = this.dashboardService.getStoredCountdown();

    if (storedCountdown) {
      // Se è presente un conto alla rovescia memorizzato, utilizzalo
      this.countdownTime = storedCountdown;
      this.startCountdown(this.parseCountdown(storedCountdown));
    } else if (this.days) {
      // Altrimenti, se hai specificato i giorni, inizia un nuovo conto alla rovescia
      this.startCountdown(this.days * 24 * 3600);
    }
  }

  startCountdown(seconds: number) {
    let remainingTime = seconds;
    this.updateCountdown(remainingTime);

    const countdownInterval = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        //GG:HH:MM:SS
        this.countdownTime = '00:00:00:00';
        // cose appena terminato
      } else {
        this.updateCountdown(remainingTime);
      }
    }, 1000);
  }

  updateCountdown(seconds: number) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds -= days * 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    this.countdownTime = `${this.formatTimeUnit(days)}:${this.formatTimeUnit(
      hours
    )}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;

    // Salva il conto alla rovescia in localStorage
    this.dashboardService.storeCountdown(this.countdownTime);
  }

  formatTimeUnit(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  parseCountdown(countdown: string): number {
    const parts = countdown.split(':');
    if (parts.length !== 4) {
      return 0;
    }
    const days = parseInt(parts[0], 10);
    const hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const seconds = parseInt(parts[3], 10);
    return days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
  }
}
