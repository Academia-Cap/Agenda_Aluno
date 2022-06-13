import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCadastroComponent } from './calendario-cadastro.component';

describe('CalendarioCadastroComponent', () => {
  let component: CalendarioCadastroComponent;
  let fixture: ComponentFixture<CalendarioCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
