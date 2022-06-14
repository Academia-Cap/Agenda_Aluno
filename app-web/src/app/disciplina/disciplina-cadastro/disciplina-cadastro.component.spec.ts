import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaCadastroComponent } from './disciplina-cadastro.component';

describe('DisciplinaCadastroComponent', () => {
  let component: DisciplinaCadastroComponent;
  let fixture: ComponentFixture<DisciplinaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
