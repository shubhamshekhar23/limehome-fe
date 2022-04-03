import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HotelApiResponse, Hotel } from 'src/app/models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  _hotels: Hotel[] = [];
  selectedHotelIndex: number = 0;
  hotelDataFetched = new Subject();
  hotelSelectedByCard = new Subject();
  constructor(private _httpClient: HttpClient) {}

  get hotels() {
    return this._hotels;
  }

  set hotels(val) {
    this._hotels = val;
    this.hotelDataFetched.next(this._hotels);
  }

  getHotelsNearLocation() {
    return this._httpClient.get<HotelApiResponse>(
      `/hotels`
    ) as Observable<HotelApiResponse>;
  }

  listenToHotelDataFetched() {
    return this.hotelDataFetched.asObservable();
  }

  listenToHotelSelection() {
    return this.hotelSelectedByCard.asObservable();
  }
}
