import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneArticoliComponent } from './gestione-articoli.component';

describe('GestioneArticoliComponent', () => {
  let component: GestioneArticoliComponent;
  let fixture: ComponentFixture<GestioneArticoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneArticoliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioneArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
