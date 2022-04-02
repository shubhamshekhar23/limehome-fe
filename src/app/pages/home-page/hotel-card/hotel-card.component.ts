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
  @Output() bookHotel = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  openBookingDIalog() {
    this.bookHotel.emit(this.hotel);
  }

  makeHotelActive() {
    this.cardClicked.emit(this.hotelIndex);
  }
}
