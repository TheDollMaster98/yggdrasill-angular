import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiktokLinkComponent } from './tiktok-link.component';

describe('TiktokLinkComponent', () => {
  let component: TiktokLinkComponent;
  let fixture: ComponentFixture<TiktokLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiktokLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiktokLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
