import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoAlterarsenhaComponent } from './aluno-alterarsenha.component';

describe('AlunoAlterarsenhaComponent', () => {
  let component: AlunoAlterarsenhaComponent;
  let fixture: ComponentFixture<AlunoAlterarsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoAlterarsenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoAlterarsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
