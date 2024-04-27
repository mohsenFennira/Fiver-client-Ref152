import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPubSellerComponent } from './view-my-pub-seller.component';

describe('ViewMyPubSellerComponent', () => {
  let component: ViewMyPubSellerComponent;
  let fixture: ComponentFixture<ViewMyPubSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMyPubSellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMyPubSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
