import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pocetak1Component } from './pocetak1.component';

describe('Pocetak1Component', () => {
  let component: Pocetak1Component;
  let fixture: ComponentFixture<Pocetak1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pocetak1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pocetak1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
