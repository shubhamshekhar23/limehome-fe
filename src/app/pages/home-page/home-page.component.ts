import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
declare var google: any;

import { mockItems } from '../../shared/mockdata/hotels.mock.data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  @ViewChildren('hotel') hotelCardELemList: QueryList<ElementRef>;
  @ViewChild('book_dialog') book_dialogRef: DialogComponent;

  addressRestMarker: any;
  centerPosition: any = {
    lat: 48.137498,
    lng: 11.586863,
  };
  zoomVal = 16;
  selectedHotelIndex = 0;
  activeHotelIconSrc = 'assets/home-icon-active.svg';
  inactiveHotelIconSrc = 'assets/home-icon.svg';

  markerList: any = [];

  bookHotelSrc: any = null;

  constructor() {}

  ngOnInit(): void {}

  openBookingDIalog(hotel: any) {
    this.bookHotelSrc = hotel;
    this.book_dialogRef.open();
  }

  isHotelActive(index: number) {
    return this.selectedHotelIndex === index;
  }

  makeHotelActive(index: number) {
    const markerCOrrespondingToHotelClicked = this.markerList[index];
    this._handleDisplayChangeOfIcon(markerCOrrespondingToHotelClicked);
  }

  get hotelList() {
    return mockItems;
  }

  ngAfterViewInit(): void {
    this.initialiseMap();
    this.placeMarkerForHotels();
  }

  initialiseMap() {
    const mapProperties = {
      center: new google.maps.LatLng(
        this.centerPosition.lat,
        this.centerPosition.lng
      ),
      zoom: this.zoomVal,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
  }

  placeMarkerForHotels() {
    mockItems.forEach((item, index) => {
      const { lat, lng } = item.position;
      const latlng = new google.maps.LatLng(lat, lng);
      const iconSrc =
        index === this.selectedHotelIndex
          ? this.activeHotelIconSrc
          : this.inactiveHotelIconSrc;
      let marker = new google.maps.Marker({
        map: this.map,
        position: latlng,
        icon: iconSrc,
        index: index,
      });
      this.markerList.push(marker);
      this.addEventListenerForMarker(marker);
    });
  }

  addEventListenerForMarker(marker: any) {
    google.maps.event.addListener(marker, 'click', () => {
      this._handleDisplayChangeOfIcon(marker);
      this._handleScrollOfHotelCardIntoView(marker.index);
      console.warn(marker.position.lat());
      console.warn(marker.position.lng());
    });
  }

  _handleScrollOfHotelCardIntoView(index: number) {
    this.hotelCardELemList.toArray()[index].nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'end',
      // block: 'start',
    });
  }

  _handleDisplayChangeOfIcon(marker: any) {
    if (marker.index !== this.selectedHotelIndex) {
      marker.setIcon(this.activeHotelIconSrc);
      this.markerList[this.selectedHotelIndex].setIcon(
        this.inactiveHotelIconSrc
      );
      this.selectedHotelIndex = marker.index;
      this._changeMapCentreToSelectedHotelMarker(marker);
    }
  }

  _changeMapCentreToSelectedHotelMarker(marker: any) {
    this.map.panTo({
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    });
  }
}
