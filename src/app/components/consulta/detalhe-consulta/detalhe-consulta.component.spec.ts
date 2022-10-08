import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheConsultaComponent } from './detalhe-consulta.component';

describe('DetalheConsultaComponent', () => {
  let component: DetalheConsultaComponent;
  let fixture: ComponentFixture<DetalheConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
