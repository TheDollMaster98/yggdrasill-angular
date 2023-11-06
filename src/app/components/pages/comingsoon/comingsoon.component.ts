import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.scss'],
})
export class ComingsoonPage implements OnInit {
  constructor() {}
  text: string = 'coming soon';
  ngOnInit(): void {}
}
