import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovimientoComponent } from './add-movimiento.component';

describe('AddMovimientoComponent', () => {
  let component: AddMovimientoComponent;
  let fixture: ComponentFixture<AddMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
