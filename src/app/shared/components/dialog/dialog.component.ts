import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modalRef: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.modalRef.nativeElement.style.display = 'flex';
  }

  close() {
    this.modalRef.nativeElement.style.display = 'none';
  }
}
