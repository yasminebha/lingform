import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  override value?: string;
  @Input()
  isDisabled: boolean = false;
  @Output() 
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  emitValueChange(value: string): void {
    this.valueChange.emit(value);
    console.log(value);
    
  }
 override ngOnInit(): void {}
}
