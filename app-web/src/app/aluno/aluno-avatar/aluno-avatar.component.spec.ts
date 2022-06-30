import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoAvatarComponent } from './aluno-avatar.component';

describe('AlunoAvatarComponent', () => {
  let component: AlunoAvatarComponent;
  let fixture: ComponentFixture<AlunoAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
