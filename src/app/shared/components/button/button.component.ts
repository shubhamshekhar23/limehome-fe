import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() label = '';
  @Input() disabled = false;
  @Output() btnClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
