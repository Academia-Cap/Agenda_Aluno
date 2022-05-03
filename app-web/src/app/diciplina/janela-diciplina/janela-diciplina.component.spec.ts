import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaDiciplinaComponent } from './janela-diciplina.component';

describe('JanelaDiciplinaComponent', () => {
  let component: JanelaDiciplinaComponent;
  let fixture: ComponentFixture<JanelaDiciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JanelaDiciplinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JanelaDiciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
