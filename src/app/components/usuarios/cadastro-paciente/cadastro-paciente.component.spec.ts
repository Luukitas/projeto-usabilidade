import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPacienteComponent } from './cadastro-paciente.component';

describe('CadastroPacienteComponent', () => {
  let component: CadastroPacienteComponent;
  let fixture: ComponentFixture<CadastroPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
