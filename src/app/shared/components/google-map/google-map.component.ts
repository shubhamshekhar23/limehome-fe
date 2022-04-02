import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @Output() markerClicked = new EventEmitter<any>();
  @Input() hotels = [];

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  addressRestMarker: any;
  centerPosition: any = {
    lat: 48.137498,
    lng: 11.586863,
  };
  zoomVal = 16;
  activeHotelIconSrc = 'assets/home-icon-active.svg';
  inactiveHotelIconSrc = 'assets/home-icon.svg';
  markerList: any = [];

  constructor(public hotelService: HotelService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initialiseMap();
    this.addListenerForHotelDataFetched();
    this.addListenerForHotelCardSelection();
  }

  addListenerForHotelDataFetched() {
    this.hotelService.listenToHotelDataFetched().subscribe((data: any) => {
      this.placeMarkerForHotels();
    });
  }

  addListenerForHotelCardSelection() {
    this.hotelService.listenToHotelSelection().subscribe((index: any) => {
      this._makeMarkerActiveAndOtherInactive(
        this.markerList[index],
        this.hotelService.selectedHotelIndex
      );
      this.hotelService.selectedHotelIndex = index;
    });
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
    this.hotelService.hotels.forEach((item: any, index: any) => {
      let marker = this._getMarker(item, index);
      this.markerList.push(marker);
      this.addEventListenerForMarker(marker);
      if (index === this.hotelService.selectedHotelIndex) {
        this._changeMapCentreToSelectedHotelMarker(marker);
      }
    });
  }

  _getMarker(item: any, index: any) {
    const latlng = this._getLatLng(item);
    const iconSrc = this._getIconSrc(index);
    let marker = new google.maps.Marker({
      map: this.map,
      position: latlng,
      icon: iconSrc,
      index: index,
    });
    return marker;
  }

  _getIconSrc(index: any) {
    return index === this.hotelService.selectedHotelIndex
      ? this.activeHotelIconSrc
      : this.inactiveHotelIconSrc;
  }

  _getLatLng(item: any) {
    const { lat, lng } = item.position;
    const latlng = new google.maps.LatLng(lat, lng);
    return latlng;
  }

  addEventListenerForMarker(marker: any) {
    google.maps.event.addListener(marker, 'click', () => {
      this._handleDisplayChangeOfIcon(marker);
      this.hotelService.selectedHotelIndex = marker.index;
      this.markerClicked.emit(marker.index);
    });
  }

  _handleDisplayChangeOfIcon(marker: any) {
    if (marker.index !== this.hotelService.selectedHotelIndex) {
      this._makeMarkerActiveAndOtherInactive(
        marker,
        this.hotelService.selectedHotelIndex
      );
    }
  }

  _makeMarkerActiveAndOtherInactive(marker: any, prevIndex: any) {
    marker.setIcon(this.activeHotelIconSrc);
    this.markerList[prevIndex].setIcon(this.inactiveHotelIconSrc);
    this._changeMapCentreToSelectedHotelMarker(marker);
  }

  _changeMapCentreToSelectedHotelMarker(marker: any) {
    this.map.panTo({
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    });
  }
}
