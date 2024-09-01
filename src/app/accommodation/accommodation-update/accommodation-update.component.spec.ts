import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdateComponent } from './accommodation-update.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccommodationUpdateComponent', () => {
  let component: AccommodationUpdateComponent;
  let fixture: ComponentFixture<AccommodationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
