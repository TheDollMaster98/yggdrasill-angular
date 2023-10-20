import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchClockComponent } from './glitch-clock.component';

describe('GlitchClockComponent', () => {
  let component: GlitchClockComponent;
  let fixture: ComponentFixture<GlitchClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlitchClockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlitchClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
