import {
  Component,
  ElementRef,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
    },
  ],
})
export class CheckboxComponent
  extends BaseControlComponent<string | number, HTMLInputElement>
  implements OnInit
{
  name: string = '';

  inputStyles: string = 'shared';

  checkmarkStyles: string = 'checkmark';

  @Input()
  type: 'checkbox' | 'radio' = 'checkbox';

  @Input()
  text: string = '';

  @Input()
  isDisabled: boolean = false;

  ngOnInit(): void {
    if (this.type == 'radio') {
      this.inputStyles += ' radio';
      this.checkmarkStyles += ' radio-mark';
      this.name = 'same';
    } else if (this.type == 'checkbox') {
      this.inputStyles += ' checkbox';
      this.checkmarkStyles += ' checkbox-mark';
    }
  }
}
