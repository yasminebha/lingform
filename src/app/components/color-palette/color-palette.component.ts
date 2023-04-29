import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'lf-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css'],
})
export class ColorPaletteComponent implements OnInit {
  @Input()
  palette: string[] = ['#DB4437', '#4F2ECB'];

  @Output()
  onChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  onColorChange(event: any) {
    this.palette.push(event.target.value);
  }

  handleColorChange(color: string) {
    this.onChange.emit(color);
  }
}
