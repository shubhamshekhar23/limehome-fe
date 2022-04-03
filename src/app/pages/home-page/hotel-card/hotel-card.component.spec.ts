/* Component */
import { HotelCardComponent } from './hotel-card.component';

/* Angular */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Other */
import { FormBuilder } from '@angular/forms';

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelCardComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('makeHotelActive should work', () => {
    let spy1 = spyOn(component.cardClicked, 'emit');

    component.makeHotelActive();

    expect(spy1).toHaveBeenCalledWith(component.hotelIndex);
  });

  it('openBookingDIalog should work', () => {
    let spy1 = spyOn(component.bookHotel, 'emit');

    component.openBookingDIalog();

    expect(spy1).toHaveBeenCalledWith(component.hotel);
  });
});
