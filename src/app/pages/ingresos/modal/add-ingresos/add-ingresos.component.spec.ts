import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngresosComponent } from './add-ingresos.component';

describe('AddIngresosComponent', () => {
  let component: AddIngresosComponent;
  let fixture: ComponentFixture<AddIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
