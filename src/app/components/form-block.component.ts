import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { BaseControlComponent } from '@/shared/ui-components/base-control.component';
import { QuestionService } from '@/shared/services/question.service';
import { removeBlock } from '../store/actions/builder.actions';

@Component({
  template: '',
})
export class FormBlockComponent<TValue, TMeta=any>
  extends BaseControlComponent<TValue, any>
  implements OnInit
{
  @Input()
  mode: 'edit' | 'live' = 'live';
  @Input()
  override value?: TValue;
  @Input()
  id!: string;
  @Input()
  kind!: string;
  @Input()
  required: boolean = false;
  @Input()
  metaData?: TMeta;
  @Input()

  label!:string;

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef<any>,
    protected store: Store<AppState>
  ) {
    super(_renderer, _elementRef);
  }

  override ngOnInit(): void {}
  removeBlock(){
    this.store.dispatch(
      removeBlock({
        blockId:this.id as string
      })
    )

  }
}
