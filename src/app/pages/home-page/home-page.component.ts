import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { HotelApiResponse } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChildren('hotel') hotelCardELemList: QueryList<ElementRef>;
  @ViewChild('book_dialog') book_dialogRef: DialogComponent;

  bookHotelSrc: any = null;
  isBookingConfirmed = false;
  hotelList: any = [];

  scrollTimer: any = -1;

  constructor(public hotelService: HotelService) {}

  onScroll(event: any) {
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      if (this.scrollTimer != -1) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        const [MIN_X, MAX_X] = [-305, 150];
        this.hotelCardELemList.toArray().forEach((element, index) => {
          let detail = element.nativeElement.getBoundingClientRect();
          if (detail.x < MAX_X && detail.x > MIN_X) {
            this.makeHotelActive(index);
          }
        });
      }, 200);
    }
  }

  ngOnInit(): void {
    this._getHotelLists();
  }

  _getHotelLists() {
    this.hotelService.getHotelsNearLocation().subscribe(
      (res: HotelApiResponse) => {
        this.hotelService.hotels = res?.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openBookingDIalog(hotel: any) {
    this.isBookingConfirmed = false;
    this.bookHotelSrc = hotel;
    this.book_dialogRef.open();
  }

  doRequestBooking() {
    this.isBookingConfirmed = true;
  }

  isHotelActive(index: number) {
    return this.hotelService.selectedHotelIndex === index;
  }

  _handleScrollOfHotelCardIntoView(index: number) {
    this.hotelCardELemList.toArray()[index].nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'end',
    });
  }

  makeHotelActive(index: number) {
    this.hotelService.hotelSelectedByCard.next(index);
  }
}
