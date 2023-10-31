import { Component, OnInit } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';

@Component({
  selector: 'lg-date-element',
  templateUrl: './date-element.component.html',
  styleUrls: ['./date-element.component.css'],
})
export class DateElementComponent
  extends FormBlockComponent<Date>
  implements OnInit
{
  override ngOnInit(): void {}
}
