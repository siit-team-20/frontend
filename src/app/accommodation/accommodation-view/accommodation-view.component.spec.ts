import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationViewComponent } from './accommodation-view.component';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';

describe('AccommodationViewComponent', () => {
  let component: AccommodationViewComponent;
  let fixture: ComponentFixture<AccommodationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
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
