import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWordpressComponent } from './home-wordpress.component';

describe('HomeWordpressComponent', () => {
  let component: HomeWordpressComponent;
  let fixture: ComponentFixture<HomeWordpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeWordpressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWordpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
