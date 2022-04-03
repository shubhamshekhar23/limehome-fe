/* Component */
import { HotelBookingFormComponent } from './hotel-booking-form.component';

/* Angular */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Other */
import { FormBuilder } from '@angular/forms';

describe('HotelBookingFormComponent', () => {
  let component: HotelBookingFormComponent;
  let fixture: ComponentFixture<HotelBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelBookingFormComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingFormComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('makeBooking should work', () => {
    spyOn(component.requestBooking, 'emit');

    component.makeBooking();

    expect(component.requestBooking.emit).toHaveBeenCalledWith(
      component.getFormData()
    );
  });

  it('getFormData should work', () => {
    let result: any = {
      value: 'xyz',
    };
    let spy1 = spyOn(component, 'getValue').and.callFake((arg: any): any => {
      if (arg === 'phone' || arg === 'persons') {
        return { value: 123 };
      } else {
        return { value: 'xyz' };
      }
    });

    let res = component.getFormData();
    expect(res).toEqual({
      name: 'xyz',
      email: 'xyz',
      phone: 123,
      persons: 123,
      checkInDate: 'xyz',
    });
  });

  it('isFormItemErrorRequiredAbsent should work', () => {
    let result: any = {
      errors: {
        required: true,
      },
    };
    let spy1 = spyOn(component, 'getValue').and.returnValue(result);

    expect(component.isFormItemErrorRequiredAbsent('name')).toBe(false);
  });

  describe('isFormItemInvalid testing', () => {
    beforeEach(() => {});

    it('isFormItemInvalid should work when not valid', () => {
      let result: any = {
        valid: false,
        dirty: false,
        touched: true,
        errors: {
          required: true,
        },
      };
      let spy1 = spyOn(component, 'getValue').and.returnValue(result);

      expect(component.isFormItemInvalid('name')).toBeTruthy();
    });
  });

  it('titleText should work', () => {
    expect(component.titleText).toEqual('Book Your Hotel');
  });

  it('getValue should work', () => {
    let getSpy = spyOn(component.bookingForm, 'get');

    component.getValue('name');

    expect(getSpy).toHaveBeenCalledWith('name');
  });
});
