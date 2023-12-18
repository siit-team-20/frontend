import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationViewComponent } from './accommodation-view.component';

describe('AccommodationViewComponent', () => {
  let component: AccommodationViewComponent;
  let fixture: ComponentFixture<AccommodationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
