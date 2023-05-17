import { AppState } from '@/app/store/reducers';
import { Component, DoCheck, ElementRef,OnInit, Renderer2, } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({ template: '' })
export class BaseControlComponent<TValue, TElement>
  implements ControlValueAccessor, DoCheck
{
  public value?: TValue;
  public ThemeColor: string = '#7339ed';



  public changeCommit = (val: TValue) => {
    this.value = val;
  };

  onTouched = (evt: any) => {};

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<TElement>,
    readonly store: Store<AppState>
  ) {}
  
  ngDoCheck(): void {}
  ngOnInit():void{
    this.store.subscribe(({ builder }) => {
      this.ThemeColor = builder.ThemeColor;
    });

  }
  
  public writeValue(val: TValue): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', val);
  }

  public registerOnChange(fn: (v: TValue) => void): void {
    this.changeCommit = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
