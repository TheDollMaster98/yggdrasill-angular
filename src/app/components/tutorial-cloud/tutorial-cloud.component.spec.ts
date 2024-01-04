import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCloudComponent } from './tutorial-cloud.component';

describe('TutorialCloudComponent', () => {
  let component: TutorialCloudComponent;
  let fixture: ComponentFixture<TutorialCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
