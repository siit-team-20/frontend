import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewsComponent } from './accommodation-reviews.component';

describe('AccommodationReviewsComponent', () => {
  let component: AccommodationReviewsComponent;
  let fixture: ComponentFixture<AccommodationReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
