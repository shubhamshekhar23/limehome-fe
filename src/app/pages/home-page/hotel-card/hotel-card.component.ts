import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: any;
  @Input() hotelIndex: number;
  @Input() isActive: boolean;
  @Output() cardClicked = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  get imgSrc() {
    return `https://picsum.photos/90/145?random=${this.hotelIndex}`;
  }

  get distanceText() {
    return ' KM FAR FROM THE LOCATION';
  }

  get hotelAddress() {
    const { street, postalCode, city, countryName } = this.hotel.address;
    return `${street}, ${postalCode} ${city}, ${countryName}`;
  }

  makeHotelActive() {
    this.cardClicked.emit(this.hotelIndex);
  }
}
