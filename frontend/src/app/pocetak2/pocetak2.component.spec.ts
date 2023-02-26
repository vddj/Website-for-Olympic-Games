import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pocetak2Component } from './pocetak2.component';

describe('Pocetak2Component', () => {
  let component: Pocetak2Component;
  let fixture: ComponentFixture<Pocetak2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pocetak2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pocetak2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
