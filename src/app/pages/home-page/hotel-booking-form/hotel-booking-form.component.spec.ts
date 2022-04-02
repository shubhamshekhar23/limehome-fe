import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingFormComponent } from './hotel-booking-form.component';

describe('HotelBookingFormComponent', () => {
  let component: HotelBookingFormComponent;
  let fixture: ComponentFixture<HotelBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBookingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
