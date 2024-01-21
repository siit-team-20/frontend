import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewsComponent } from './owner-reviews.component';

describe('OwnerReviewsComponent', () => {
  let component: OwnerReviewsComponent;
  let fixture: ComponentFixture<OwnerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
