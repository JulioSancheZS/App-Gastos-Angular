import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLugarComponent } from './add-edit-lugar.component';

describe('AddEditLugarComponent', () => {
  let component: AddEditLugarComponent;
  let fixture: ComponentFixture<AddEditLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
