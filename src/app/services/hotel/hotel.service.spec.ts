import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/app/models/hotel.model';

describe('HotelService', () => {
  let service: HotelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService],
    });
    service = TestBed.inject(HotelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listenToHotelDataFetched should work', () => {
    expect(service.listenToHotelDataFetched()).toEqual(
      service.hotelDataFetched.asObservable()
    );
  });

  it('listenToHotelSelection should work', () => {
    expect(service.listenToHotelSelection()).toEqual(
      service.hotelSelectedByCard.asObservable()
    );
  });

  it('getHotelsNearLocation should work', () => {
    service.getHotelsNearLocation().subscribe(() => {});

    const req = httpTestingController.expectOne('/hotels');
    expect(req.request.method).toEqual('GET');
  });

  it('should get hotels', () => {
    expect(service.hotels).toEqual(service._hotels);
  });

  it('should set hotels', () => {
    let spy1 = spyOn(service.hotelDataFetched, 'next');
    service.hotels = [] as Hotel[];

    expect(service._hotels).toEqual([]);
    expect(spy1).toHaveBeenCalled();
  });
});
