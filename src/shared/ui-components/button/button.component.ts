import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input()
  layout!: string;

  @Input()
  text?: string = '';
  @Input()
  type: 'submit' | 'reset' | 'button' = 'button';
  @Input()
  isDisabled:boolean=false
  classes!: string;

  width!: number;

  styles: string[] = ['btn'];

  constructor() {}

  ngOnInit(): void {
    if (!this.layout) {
      this.styles.push('primary');
    } else {
      this.styles.push(this.layout);
    }
    this.classes = this.styles.join(' ');
  }
}
