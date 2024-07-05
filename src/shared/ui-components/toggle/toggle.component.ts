import { Component, ElementRef, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { QuestionElement } from '@/shared/models/questionElement.model';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent
  extends BaseControlComponent<boolean, HTMLInputElement>
  implements OnInit
{

 required:boolean=false
  @Input() block!:QuestionElement
  notRequiredLabel?: string = 'not Required';
  requiredLabel?: string = 'Required';

  override ngOnInit(): void {}
  onToggle() {
      
    this.required =!this.required;
    this.store.dispatch(
        updateBlock({
          blockId: this.block.quest_id,
          required: this.required,
        })
      );

    
  }
}
