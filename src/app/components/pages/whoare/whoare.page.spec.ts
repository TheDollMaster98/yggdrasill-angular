import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoarePage } from './whoare.page';

describe('WhoarePage', () => {
  let component: WhoarePage;
  let fixture: ComponentFixture<WhoarePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhoarePage],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
