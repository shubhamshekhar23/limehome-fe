/* Component */
import { GoogleMapComponent } from './google-map.component';

/* Angular */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable, of, Subject, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/* other */
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  let hotelService: jasmine.SpyObj<HotelService>;

  function initializeVariables() {
    hotelService = TestBed.get(HotelService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
  }

  function getHelperObjects() {
    return {
      hotelService: jasmine.createSpyObj('HotelService', [
        'getHotelsNearLocation',
        'listenToHotelDataFetched',
        'listenToHotelSelection',
      ]),
    };
  }

  beforeEach(async(() => {
    const serviceObjects = getHelperObjects();

    TestBed.configureTestingModule({
      declarations: [GoogleMapComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        { provide: HotelService, useValue: serviceObjects.hotelService },
      ],
    }).compileComponents();

    initializeVariables();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_changeMapCentreToSelectedHotelMarker should work', () => {
    let marker = {
      setIcon: () => {},
      position: {
        lat: () => {},
        lng: () => {},
      },
    };
    component.map = {
      panTo: () => {},
    } as any;
    let spy1 = spyOn(component.map, 'panTo');

    component._changeMapCentreToSelectedHotelMarker(marker);

    expect(spy1).toHaveBeenCalled();
  });

  it('_makeMarkerActiveAndOtherInactive should work', () => {
    let marker = {
      setIcon: () => {},
    };
    component.markerList = [{ setIcon: () => {} }];
    let spy1 = spyOn(component, '_changeMapCentreToSelectedHotelMarker');

    component._makeMarkerActiveAndOtherInactive(marker, 0);

    expect(spy1).toHaveBeenCalled();
  });

  it('_handleDisplayChangeOfIcon should work', () => {
    let spy1 = spyOn(component, '_makeMarkerActiveAndOtherInactive');
    component.hotelService.selectedHotelIndex = 1;

    component._handleDisplayChangeOfIcon({
      index: 0,
    });

    expect(spy1).toHaveBeenCalled();
  });

  it('addEventListenerForMarker should work', () => {
    window.google = {
      maps: {
        event: {
          addListener: (a1: any, a2: any, a3: any) => {
            a3();
          },
        },
      },
    } as any;
    let spy1 = spyOn(component, '_handleDisplayChangeOfIcon');
    let spy2 = spyOn(component.markerClicked, 'emit');

    component.addEventListenerForMarker({});

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('_getLatLng should work', () => {
    window.google = {
      maps: {
        LatLng: function () {},
        MapTypeId: {},
        Map: function () {},
        Marker: function () {},
      },
    } as any;

    expect(
      component._getLatLng({
        position: {},
      })
    ).toBeTruthy();
  });

  it('_getIconSrc should work', () => {
    component.hotelService.selectedHotelIndex = 0;

    expect(component._getIconSrc(0)).toEqual(component.activeHotelIconSrc);

    component.hotelService.selectedHotelIndex = 0;

    expect(component._getIconSrc(1)).toEqual(component.inactiveHotelIconSrc);
  });

  it('_getMarker should work', () => {
    window.google = {
      maps: {
        LatLng: function () {},
        MapTypeId: {},
        Map: function () {},
        Marker: function () {},
      },
    } as any;
    let spy1 = spyOn(component, '_getLatLng');
    let spy2 = spyOn(component, '_getIconSrc');

    component._getMarker({}, 0);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('placeMarkerForHotels should work', () => {
    component.hotelService.hotels = [{} as Hotel];
    let spy1 = spyOn(component, '_getMarker');
    let spy2 = spyOn(component, 'addEventListenerForMarker');
    let spy3 = spyOn(component, '_changeMapCentreToSelectedHotelMarker');

    component.hotelService.selectedHotelIndex = 0;

    component.placeMarkerForHotels();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('initialiseMap should work', () => {
    window.google = {
      maps: {
        LatLng: function () {},
        MapTypeId: {},
        Map: function () {},
      },
    } as any;
    component.mapElement = {};

    component.initialiseMap();

    expect(component.map).toBeTruthy();
  });

  it('addListenerForHotelCardSelection should work', () => {
    component.hotelService.listenToHotelSelection = () => of(0);
    component.hotelService.selectedHotelIndex = 1;

    let spy1 = spyOn(component, '_makeMarkerActiveAndOtherInactive');

    component.addListenerForHotelCardSelection();

    expect(spy1).toHaveBeenCalled();
    expect(component.hotelService.selectedHotelIndex).toEqual(0);
  });

  it('addListenerForHotelDataFetched should work', () => {
    component.hotelService.listenToHotelDataFetched = () => of({});
    let spy1 = spyOn(component, 'placeMarkerForHotels');

    component.addListenerForHotelDataFetched();

    expect(spy1).toHaveBeenCalled();
  });

  it('ngAfterViewInit should work', () => {
    let spy1 = spyOn(component, 'initialiseMap');
    let spy2 = spyOn(component, 'addListenerForHotelDataFetched');
    let spy3 = spyOn(component, 'addListenerForHotelCardSelection');

    component.ngAfterViewInit();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
