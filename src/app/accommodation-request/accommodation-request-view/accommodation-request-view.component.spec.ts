import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestViewComponent } from './accommodation-request-view.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccommodationRequestViewComponent', () => {
  let component: AccommodationRequestViewComponent;
  let fixture: ComponentFixture<AccommodationRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
