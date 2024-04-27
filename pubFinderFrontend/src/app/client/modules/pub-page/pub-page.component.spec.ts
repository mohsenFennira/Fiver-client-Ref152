import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubPageComponent } from './pub-page.component';

describe('PubPageComponent', () => {
  let component: PubPageComponent;
  let fixture: ComponentFixture<PubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PubPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
