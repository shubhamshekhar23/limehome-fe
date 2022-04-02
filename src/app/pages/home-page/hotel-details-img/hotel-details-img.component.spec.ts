import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsImgComponent } from './hotel-details-img.component';

describe('HotelDetailsImgComponent', () => {
  let component: HotelDetailsImgComponent;
  let fixture: ComponentFixture<HotelDetailsImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelDetailsImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
