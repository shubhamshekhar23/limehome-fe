/* Component */
import { HomePageComponent } from './home-page.component';

/* Angular */
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
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
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
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
      ]),
    };
  }

  beforeEach(async(() => {
    const serviceObjects = getHelperObjects();

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        { provide: HotelService, useValue: serviceObjects.hotelService },
      ],
    }).compileComponents();

    initializeVariables();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onScroll should work', fakeAsync(() => {
    spyOnProperty(window, 'innerWidth').and.returnValue(400);
    let spy1 = spyOn(window, 'clearTimeout');
    let spy2 = spyOn(component, 'checkAndDoTheCardSelection');
    component.scrollTimer = {};

    component.onScroll({});
    tick(300);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  }));

  it('checkAndDoTheCardSelection should work', () => {
    let targetObj = {
      nativeElement: {
        scrollIntoView: () => {},
        getBoundingClientRect: () => ({ x: 111 }),
      },
    };
    component.hotelCardELemList = {
      toArray: () => [targetObj],
    } as any;
    let spy1 = spyOn(component, 'makeHotelActive');

    component.checkAndDoTheCardSelection();

    expect(spy1).toHaveBeenCalled();
  });

  it('makeHotelActive should work', () => {
    component.hotelService.hotelSelectedByCard = new Subject();
    let spy1 = spyOn(component.hotelService.hotelSelectedByCard, 'next');

    component.makeHotelActive(0);

    expect(spy1).toHaveBeenCalled();
  });

  it('_handleScrollOfHotelCardIntoView should work', () => {
    let targetObj = {
      nativeElement: {
        scrollIntoView: () => {},
      },
    };
    component.hotelCardELemList = {
      toArray: () => [targetObj],
    } as any;

    let spy1 = spyOn(targetObj.nativeElement, 'scrollIntoView');

    component._handleScrollOfHotelCardIntoView(0);

    expect(spy1).toHaveBeenCalled();
  });

  it('isHotelActive should work', () => {
    component.hotelService.selectedHotelIndex = 0;

    expect(component.isHotelActive(0)).toBeTrue();
  });

  it('doRequestBooking should work', () => {
    component.doRequestBooking();

    expect(component.isBookingConfirmed).toBeTruthy();
  });

  it('openBookingDIalog should work', () => {
    component.book_dialogRef = {
      open: () => {},
    } as DialogComponent;
    spyOn(component.book_dialogRef, 'open');

    component.openBookingDIalog({});

    expect(component.isBookingConfirmed).toBeFalsy();
    expect(component.bookHotelSrc).toBeTruthy();
    expect(component.book_dialogRef.open).toHaveBeenCalled();
  });

  it('_getHotelLists should work', fakeAsync(() => {
    let res = { items: [] };
    hotelService.getHotelsNearLocation.and.returnValue(of(res));

    component._getHotelLists();
    tick();
    flush();

    expect(hotelService.hotels).toBeTruthy();
  }));

  it('ngOnInit should work', () => {
    spyOn(component, '_getHotelLists').and.callFake(() => {});

    component.ngOnInit();

    expect(component._getHotelLists).toHaveBeenCalled();
  });
});
