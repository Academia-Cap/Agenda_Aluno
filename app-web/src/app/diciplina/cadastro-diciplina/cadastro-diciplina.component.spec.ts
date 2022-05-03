import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDiciplinaComponent } from './cadastro-diciplina.component';

describe('CadastroDiciplinaComponent', () => {
  let component: CadastroDiciplinaComponent;
  let fixture: ComponentFixture<CadastroDiciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDiciplinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDiciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
