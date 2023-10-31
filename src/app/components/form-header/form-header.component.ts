import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';

@Component({
  selector: 'lg-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormHeaderComponent),
    },
  ],
})
export class FormHeaderComponent
  extends FormBlockComponent<string[]>
  implements OnInit
{



  
}
