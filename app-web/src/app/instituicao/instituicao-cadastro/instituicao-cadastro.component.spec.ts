import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoCadastroComponent } from './instituicao-cadastro.component';

describe('InstituicaoCadastroComponent', () => {
  let component: InstituicaoCadastroComponent;
  let fixture: ComponentFixture<InstituicaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituicaoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
