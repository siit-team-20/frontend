import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestsComponent } from './accommodation-requests.component';

describe('AccommodationRequestsComponent', () => {
  let component: AccommodationRequestsComponent;
  let fixture: ComponentFixture<AccommodationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
