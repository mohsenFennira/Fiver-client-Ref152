import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFromAdminSideComponent } from './add-user-from-admin-side.component';

describe('AddUserFromAdminSideComponent', () => {
  let component: AddUserFromAdminSideComponent;
  let fixture: ComponentFixture<AddUserFromAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserFromAdminSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserFromAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
