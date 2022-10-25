import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaConsultaComponent } from './edita-consulta.component';

describe('EditaConsultaComponent', () => {
  let component: EditaConsultaComponent;
  let fixture: ComponentFixture<EditaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
