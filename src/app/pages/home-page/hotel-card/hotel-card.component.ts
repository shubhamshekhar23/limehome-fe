import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: Hotel;
  @Input() hotelIndex: number;
  @Input() isActive: boolean;
  @Output() cardClicked = new EventEmitter<number>();
  @Output() bookHotel = new EventEmitter<Hotel>();

  constructor() {}

  ngOnInit(): void {}

  openBookingDIalog() {
    this.bookHotel.emit(this.hotel);
  }

  makeHotelActive() {
    this.cardClicked.emit(this.hotelIndex);
  }
}
