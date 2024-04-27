import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultClientComponent } from './default-client.component';

describe('DefaultClientComponent', () => {
  let component: DefaultClientComponent;
  let fixture: ComponentFixture<DefaultClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
