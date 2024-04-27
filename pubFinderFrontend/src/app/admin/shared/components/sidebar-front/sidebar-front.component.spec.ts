import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFrontComponent } from './sidebar-front.component';

describe('SidebarFrontComponent', () => {
  let component: SidebarFrontComponent;
  let fixture: ComponentFixture<SidebarFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
