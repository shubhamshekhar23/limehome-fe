import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  _hotels: any = [];
  selectedHotelIndex: any = 0;
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
    return this._httpClient.get(`/hotels`);
  }

  listenToHotelDataFetched() {
    return this.hotelDataFetched.asObservable();
  }

  listenToHotelSelection() {
    return this.hotelSelectedByCard.asObservable();
  }
}
