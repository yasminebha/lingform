import { AppState } from '@/app/store/reducers';
import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({ template: '' })
export class BaseControlComponent<TValue, TElement=any>
  implements ControlValueAccessor
{
  public value?: TValue;
  public ThemeColor: string = '#7339ed';

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<TElement>,
    protected  store: Store<AppState>,

  ) {}

  public onTouched = (evt: any) => {};
  public changeCommit = (val: TValue) => {};
ngOnInit(){
  
}
  writeValue(val: TValue): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', val);
  }

  registerOnChange(fn: (v: TValue) => void): void {
    this.changeCommit = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
