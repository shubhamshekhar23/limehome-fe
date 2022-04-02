import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-hotel-booking-form',
  templateUrl: './hotel-booking-form.component.html',
  styleUrls: ['./hotel-booking-form.component.scss'],
})
export class HotelBookingFormComponent implements OnInit {
  @Input() hotel: any;
  @Output() requestBooking = new EventEmitter<any>();

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

  getFormData() {
    return {
      name: this.getValue('name')?.value,
      email: this.getValue('email')?.value,
      phone: this.getValue('phone')?.value,
      persons: this.getValue('persons')?.value,
      checkInDate: this.getValue('checkInDate')?.value,
    };
  }

  makeBooking() {
    console.warn(this.getFormData());
    this.requestBooking.emit(this.getFormData());
  }
}
