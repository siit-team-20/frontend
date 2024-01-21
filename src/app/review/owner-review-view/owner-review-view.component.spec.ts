import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewViewComponent } from './owner-review-view.component';

describe('OwnerReviewViewComponent', () => {
  let component: OwnerReviewViewComponent;
  let fixture: ComponentFixture<OwnerReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerReviewViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
