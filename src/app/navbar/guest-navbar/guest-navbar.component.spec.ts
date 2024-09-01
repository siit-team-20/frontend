import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestNavbarComponent } from './guest-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GuestNavbarComponent', () => {
  let component: GuestNavbarComponent;
  let fixture: ComponentFixture<GuestNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
