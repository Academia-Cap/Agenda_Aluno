import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoPerfilComponent } from './aluno-perfil.component';

describe('AlunoPerfilComponent', () => {
  let component: AlunoPerfilComponent;
  let fixture: ComponentFixture<AlunoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
