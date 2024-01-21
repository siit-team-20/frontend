import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewViewComponent } from './accommodation-review-view.component';

describe('AccommodationReviewViewComponent', () => {
  let component: AccommodationReviewViewComponent;
  let fixture: ComponentFixture<AccommodationReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationReviewViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
