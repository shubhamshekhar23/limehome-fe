import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-details-img',
  templateUrl: './hotel-details-img.component.html',
  styleUrls: ['./hotel-details-img.component.scss'],
})
export class HotelDetailsImgComponent implements OnInit {
  @Input() hotel: any;

  constructor() {}

  ngOnInit(): void {}

  get imgSrc() {
    return `https://picsum.photos/90/145?random=${this.hotel?.distance}`;
  }

  get distanceText() {
    return ' KM FAR FROM THE LOCATION';
  }

  get hotelAddress() {
    if (this.hotel) {
      const { street, postalCode, city, countryName } =
        this.hotel && this.hotel.address;
      return `${street}, ${postalCode} ${city}, ${countryName}`;
    }
    return '';
  }
}
