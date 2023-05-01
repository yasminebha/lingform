import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lg-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css'],
})
export class RightSideBarComponent implements OnInit {
  constructor() {}
  fontOptions: Array<{ key: any; label: string }> = [];
  headerFontSizes: Array<{ key: any; label: string }> = [];
  questionFontSizes: Array<{ key: any; label: string }> = [];
  textFontSizes: Array<{ key: any; label: string }> = [];
  ngOnInit(): void {
    this.fontOptions = [
      { key: 'roboto', label: 'Roboto' },
      { key: 'inter', label: 'inter' },
      { key: 'sans-serif', label: 'sans-serif' },
    ];
    this.headerFontSizes = [
      { key: '18', label: '18' },
      { key: '19', label: '19' },
      { key: '20', label: '20' },
      { key: '21', label: '21' },
      { key: '22', label: '22' },
      { key: '23', label: '23' },
      { key: '24', label: '24' },
    ];
    this.questionFontSizes = [
      { key: '12', label: '12' },
      { key: '13', label: '13' },
      { key: '14', label: '14' },
      { key: '15', label: '15' },
      { key: '16', label: '16' },
      { key: '17', label: '17' },
      { key: '18', label: '18' },
    ];
    this.textFontSizes = [
      { key: '9', label: '9' },
      { key: '10', label: '10' },
      { key: '11', label: '11' },
      { key: '12', label: '12' },
    ];
  }
  @Output() fontChanged = new EventEmitter<string>();
  @Output() fontSizeChanged = new EventEmitter<string>();

  setFont(font: string) {
    this.fontChanged.emit(font);
  }

  setFontSize(size: string) {
    this.fontSizeChanged.emit(size);
  }
  onSave() {
    console.log('=====');
  }
  handleHeaderFont($event: any) {
    console.log($event.target.value);
  }

  onColorChange(color: string) {
    console.log(color);
  }
}
