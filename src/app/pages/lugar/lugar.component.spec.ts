import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarComponent } from './lugar.component';

describe('LugarComponent', () => {
  let component: LugarComponent;
  let fixture: ComponentFixture<LugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
