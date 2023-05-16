import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent
  extends BaseControlComponent<boolean, HTMLInputElement>
  implements OnInit
{
  @Input()
  notRequiredLabel?: string = 'not Required';

  @Input()
  requiredLabel?: string = 'Required';

  ngOnInit(): void {}
}
