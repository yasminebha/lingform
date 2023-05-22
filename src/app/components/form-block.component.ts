import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { BaseControlComponent } from '@/shared/ui-components/base-control.component';

@Component({
  template: '',
})
export class FormBlockComponent<TValue>
  extends BaseControlComponent<TValue, any>
  implements OnInit
{
  @Input()
  mode: 'edit' | 'live' = 'live';
  @Input()
  override value?: TValue;
  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef<any>,
    protected store: Store<AppState>
  ) {
    super(_renderer, _elementRef);
  }

  override ngOnInit(): void {}
}
