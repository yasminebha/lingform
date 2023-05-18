import {
  Component,
  ElementRef,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'lg-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent
  extends BaseControlComponent<string, HTMLInputElement>
  implements OnInit
{
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
  override value?: string | undefined;
  @Input()
  isDisabled: boolean = false;


  // onChange: any = () => {};
  // onTouched: any = () => {};

  // writeValue(value: string): void {
  //   this.value = value;
  //   this.$el.nativeElement.value = value;
  // }
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   if(isDisabled)
  //   this.$el.nativeElement.disabled = isDisabled;
  // }

  override ngOnInit(): void {}
}
