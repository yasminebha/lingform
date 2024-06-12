import { Component, ElementRef, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent
  extends BaseControlComponent<boolean, HTMLInputElement>
  implements OnInit
{

  @Input() required?:boolean
  notRequiredLabel?: string = 'not Required';
  requiredLabel?: string = 'Required';

  override ngOnInit(): void {}
  
}
