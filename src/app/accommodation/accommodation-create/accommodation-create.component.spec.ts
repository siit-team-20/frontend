import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreateComponent } from './accommodation-create.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccommodationCreateComponent', () => {
  let component: AccommodationCreateComponent;
  let fixture: ComponentFixture<AccommodationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
