import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogWordpressComponent } from './blog-wordpress.component';

describe('BlogWordpressComponent', () => {
  let component: BlogWordpressComponent;
  let fixture: ComponentFixture<BlogWordpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogWordpressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogWordpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
