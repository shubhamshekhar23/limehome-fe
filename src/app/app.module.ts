// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelCardComponent } from './pages/home-page/hotel-card/hotel-card.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { HotelBookingFormComponent } from './pages/home-page/hotel-booking-form/hotel-booking-form.component';
import { HotelDetailsImgComponent } from './pages/home-page/hotel-details-img/hotel-details-img.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HotelBookingSuccessComponent } from './pages/home-page/hotel-booking-success/hotel-booking-success.component';
import { GoogleMapComponent } from './shared/components/google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HotelCardComponent,
    HeaderComponent,
    DialogComponent,
    HotelBookingFormComponent,
    HotelDetailsImgComponent,
    ButtonComponent,
    HotelBookingSuccessComponent,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
