import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { updateBlock } from '@/app/store/actions/builder.actions';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent
  extends BaseControlComponent<boolean, HTMLInputElement>
  implements OnInit
{
 
  @Output() required : boolean= true
  notRequiredLabel?: string = 'not Required';
  requiredLabel?: string = 'Required';

  override ngOnInit(): void {}
  onToggle(){
  if (this.required)
    this.required=false
  else
    this.required=true

  }
  // this.store.dispatch(
  //   updateBlock({
  //     blockId: this.id,
  //     questLabel: updatedValue,
  //   })
  // );
}
