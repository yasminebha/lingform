import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'lg-input-components',
  templateUrl: './input-components.component.html',
  styleUrls: ['./input-components.component.css'],
})
export class InputComponentsComponent implements OnInit {
  @Input()
  layout?:'default'|'second-layout'='default'


  @Input()
  title: string =
    'Heading' ||
    'With Body' ||
    'image' ||
    'Short Answer ' ||
    'Paragraph' ||
    'email' ||
    'Date & Time' ||
    'phone' ||
    'Multiple choice' ||
    'one choice' ||
    'file upload' ||
    'Yes/No';
    @Input()
    icon!: string;
    @Input()
    iconSize?: string;
    @Input()
    iconStyle: 'solid' | 'regular' | 'light' |'thin' |'duotone'= 'solid';
  constructor() {}

  ngOnInit(): void {}
  
}
