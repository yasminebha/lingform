import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, ControlValueAccessor, Validator } from '@angular/forms';
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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent
  extends BaseControlComponent<string, HTMLInputElement>
  implements OnInit, ControlValueAccessor, Validator {

  @Input() type: string = 'text';
  @Input() label?: string = undefined;
  @Input() fontSize!: string;
  @Input() placeholder?: string = '';
  @Input() layout: string = 'text-field';
  @Input() override value?: string;
  @Input() isDisabled: boolean = false;
  @Input() errorMsg: string = "";
  @Input() invalidControl: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  emitValueChange(value: string): void {
    this.valueChange.emit(value);
  }

  override ngOnInit(): void {}

  isInvalid(): boolean {
    return this.invalidControl;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (this.type === 'email') {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (value && !emailRegex.test(value)) {
        this.errorMsg = "Invalid email address";
        this.invalidControl = true;
        return { invalidEmail: true };
      }
    } else if (this.type === 'tel') {
      const phoneRegex = /^\(\+\d{1,3}\)\d{8,14}$/;
      if (value && !phoneRegex.test(value)) {
        this.errorMsg = "Invalid phone number format. Example: (+216)00000000";
        this.invalidControl = true;
        return { invalidPhoneNumber: true };
      }
    }
    this.invalidControl = false;
    return null;
  }
}
