import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingSuccessComponent } from './hotel-booking-success.component';

describe('HotelBookingSuccessComponent', () => {
  let component: HotelBookingSuccessComponent;
  let fixture: ComponentFixture<HotelBookingSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelBookingSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
