import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideBarFrontComponent } from './right-side-bar-front.component';

describe('RightSideBarFrontComponent', () => {
  let component: RightSideBarFrontComponent;
  let fixture: ComponentFixture<RightSideBarFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightSideBarFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightSideBarFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
