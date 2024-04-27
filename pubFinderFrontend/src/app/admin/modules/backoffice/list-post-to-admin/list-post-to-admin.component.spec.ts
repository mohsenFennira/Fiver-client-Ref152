import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostToAdminComponent } from './list-post-to-admin.component';

describe('ListPostToAdminComponent', () => {
  let component: ListPostToAdminComponent;
  let fixture: ComponentFixture<ListPostToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPostToAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPostToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
