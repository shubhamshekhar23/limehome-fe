import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private _httpClient: HttpClient) {}

  getHotelsNearLocation() {
    return this._httpClient.get(`/hotels`);
  }
}
