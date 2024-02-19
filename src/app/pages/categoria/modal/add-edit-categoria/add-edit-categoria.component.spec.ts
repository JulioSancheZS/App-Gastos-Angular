import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoriaComponent } from './add-edit-categoria.component';

describe('AddEditCategoriaComponent', () => {
  let component: AddEditCategoriaComponent;
  let fixture: ComponentFixture<AddEditCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
