import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent implements OnInit {
  @Input()
  leftLabel?: string;

  @Input()
  rightLabel?: string;

  constructor() {}

  ngOnInit(): void {}
}
