import {
  Component,
  ElementRef,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
    },
  ],
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {

  @Input()
  type: string = 'text';
  @Input()
  label?: string = undefined;
  @Input()
  fontSize!: string;
  @Input()
  placeholder?: string = '';
  @Input()
  layout: string = 'text-field';
  @Input()
  value?: string = undefined;
  @Input()
  isDisabled:boolean=false

  constructor(private $el: ElementRef<HTMLInputElement>) {}

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.$el.nativeElement.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if(isDisabled)
    this.$el.nativeElement.disabled = isDisabled;
  }

  ngOnInit(): void {}
}
