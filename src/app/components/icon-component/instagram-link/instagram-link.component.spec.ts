import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramLinkComponent } from './instagram-link.component';

describe('InstagramLinkComponent', () => {
  let component: InstagramLinkComponent;
  let fixture: ComponentFixture<InstagramLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
