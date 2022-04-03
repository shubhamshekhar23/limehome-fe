import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingForm, Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotel-booking-form',
  templateUrl: './hotel-booking-form.component.html',
  styleUrls: ['./hotel-booking-form.component.scss'],
})
export class HotelBookingFormComponent implements OnInit {
  @Input() hotel: Hotel;
  @Output() requestBooking = new EventEmitter<BookingForm>();

  bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    persons: ['', Validators.required],
    checkInDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  get titleText() {
    return 'Book Your Hotel';
  }

  getValue(formName: any) {
    return this.bookingForm.get(formName);
  }

  isFormItemInvalid(formName: any) {
    return (
      !this.getValue(formName)?.valid &&
      (this.getValue(formName)?.dirty || this.getValue(formName)?.touched) &&
      this.getValue(formName)?.errors?.required
    );
  }

  isFormItemErrorRequiredAbsent(formName: any) {
    return !this.getValue(formName)?.errors?.required;
  }

  ngOnInit(): void {}

  getFormData(): BookingForm {
    return {
      name: this.getValue('name')?.value,
      email: this.getValue('email')?.value,
      phone: this.getValue('phone')?.value,
      persons: this.getValue('persons')?.value,
      checkInDate: this.getValue('checkInDate')?.value,
    };
  }

  makeBooking() {
    this.requestBooking.emit(this.getFormData());
  }
}
