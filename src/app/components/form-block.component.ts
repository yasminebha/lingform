import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';

@Component({
  template: '',
})
export class FormBlockComponent<TValue> implements OnInit {
  mode: 'edit' | 'live' = 'edit';
  @Input()
  value?: TValue;

  /**
   *
   */
  constructor(readonly store: Store<AppState>) {}

  ngOnInit(): void {
   
  }
  
}
