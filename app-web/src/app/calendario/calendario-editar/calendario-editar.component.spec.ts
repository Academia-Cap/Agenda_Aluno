import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEditarComponent } from './calendario-editar.component';

describe('CalendarioEditarComponent', () => {
  let component: CalendarioEditarComponent;
  let fixture: ComponentFixture<CalendarioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
