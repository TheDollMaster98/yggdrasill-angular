import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLogoComponent } from './white-logo.component';

describe('WhiteLogoComponent', () => {
  let component: WhiteLogoComponent;
  let fixture: ComponentFixture<WhiteLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
