import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaEditaComponent } from './disciplina-edita.component';

describe('DisciplinaEditaComponent', () => {
  let component: DisciplinaEditaComponent;
  let fixture: ComponentFixture<DisciplinaEditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaEditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
