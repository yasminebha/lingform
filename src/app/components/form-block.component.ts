import { BaseControlComponent } from '@/shared/ui-components/base-control.component';
import { Component, OnInit } from '@angular/core';

@Component({
  template: '',
})
export class FormBlockComponent<TValue>
  extends BaseControlComponent<TValue, HTMLElement>
  implements OnInit
{
  mode: 'edit' | 'live' = 'edit';

  QuestLabel: string='';
  required:boolean =false;

  ngOnInit(): void {}
  
}
