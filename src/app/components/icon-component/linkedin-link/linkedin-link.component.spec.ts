import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinLinkComponent } from './linkedin-link.component';

describe('LinkedinLinkComponent', () => {
  let component: LinkedinLinkComponent;
  let fixture: ComponentFixture<LinkedinLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedinLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
