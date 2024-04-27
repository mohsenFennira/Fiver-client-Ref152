import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPubBySellerComponent } from './add-pub-by-seller.component';

describe('AddPubBySellerComponent', () => {
  let component: AddPubBySellerComponent;
  let fixture: ComponentFixture<AddPubBySellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPubBySellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPubBySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
