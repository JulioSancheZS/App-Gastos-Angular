import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemGroupComponent } from './sidebar-item-group.component';

describe('SidebarItemGroupComponent', () => {
  let component: SidebarItemGroupComponent;
  let fixture: ComponentFixture<SidebarItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
