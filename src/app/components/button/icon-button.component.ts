import { Component, OnInit, Input } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'lf-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./button.component.css'],
})
export class IconButtonComponent extends ButtonComponent implements OnInit {
  @Input()
  icon!: string;
  @Input()
  iconStyle: 'solid' | 'regular' | 'light' = 'solid';

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
