import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamButtonComponent } from './ham-button.component';

describe('HamButtonComponent', () => {
  let component: HamButtonComponent;
  let fixture: ComponentFixture<HamButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
