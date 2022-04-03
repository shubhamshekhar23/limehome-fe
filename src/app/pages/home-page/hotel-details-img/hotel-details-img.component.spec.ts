/* Component */
import { HotelDetailsImgComponent } from './hotel-details-img.component';

/* Angular */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Other */
import { FormBuilder } from '@angular/forms';

describe('HotelDetailsImgComponent', () => {
  let component: HotelDetailsImgComponent;
  let fixture: ComponentFixture<HotelDetailsImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelDetailsImgComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailsImgComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hotelAddress should work', () => {
    component.hotel = {
      title: 'Mariannenhof',
      address: {
        label: 'Mariannenhof, Mariannenstraße 1, 80538 München, Deutschland',
        countryCode: 'DEU',
        countryName: 'Deutschland',
        stateCode: 'BY',
        state: 'Bayern',
        countyCode: 'M',
        county: 'München (Stadt)',
        city: 'München',
        district: 'Lehel',
        street: 'Mariannenstraße',
        postalCode: '80538',
        houseNumber: '1',
      },
      position: {
        lat: 48.13598,
        lng: 11.58643,
      },
      distance: 127,
    };
    expect(component.hotelAddress).toEqual(
      'Mariannenstraße, 80538 München, Deutschland'
    );
  });

  it('distanceText should work', () => {
    expect(component.distanceText).toEqual(' KM FAR FROM THE LOCATION');
  });

  it('imgSrc should work', () => {
    expect(component.imgSrc).toEqual(
      `https://picsum.photos/90/145?random=${component.hotel?.distance}`
    );
  });
});
