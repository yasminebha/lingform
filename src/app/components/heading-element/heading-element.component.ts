import { Component, OnInit } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';

@Component({
  selector: 'lg-heading-element',
  templateUrl: './heading-element.component.html',
  styleUrls: ['./heading-element.component.css'],
})
export class HeadingElementComponent
  extends FormBlockComponent<string>
  implements OnInit
{
  override async ngOnInit(): Promise<void> {}
}
