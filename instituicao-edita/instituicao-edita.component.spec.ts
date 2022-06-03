import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoEditaComponent } from './instituicao-edita.component';

describe('InstituicaoEditaComponent', () => {
  let component: InstituicaoEditaComponent;
  let fixture: ComponentFixture<InstituicaoEditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituicaoEditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
