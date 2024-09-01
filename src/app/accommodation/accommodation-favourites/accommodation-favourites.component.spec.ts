import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationFavouritesComponent } from './accommodation-favourites.component';

describe('AccommodationFavouritesComponent', () => {
  let component: AccommodationFavouritesComponent;
  let fixture: ComponentFixture<AccommodationFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
