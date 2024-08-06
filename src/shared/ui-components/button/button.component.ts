import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input()
  layout?: string | null;

  @Input()
  text?: string = '';

  @Input()
  type: 'submit' | 'reset' | 'button' = 'button';

  @Input()
  isDisabled: boolean = false;

  @Input()
  width?: string;

  classes!: string;
  styles: string[] = ['btn'];

  constructor() {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['layout']) {
      this.updateClasses();
    }
  }

  updateClasses(): void {
    this.styles = ['btn'];
    if (!this.layout) {
      this.styles.push('primary');
    } else {
      this.styles.push(this.layout);
    }
    this.classes = this.styles.join(' ');
  }
}
