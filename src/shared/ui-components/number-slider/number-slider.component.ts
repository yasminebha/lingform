import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.css']
})
export class NumberSliderComponent implements OnInit {
  @Input() maxFiles: number = 1;
  @Input()maxRangeNumber?:number
  @Output() maxFilesChange: EventEmitter<number> = new EventEmitter<number>();

  onSliderChange(event: any) {
    this.maxFiles = event.target.value;
    this.maxFilesChange.emit(this.maxFiles);
  }
  constructor() { }

  ngOnInit(): void {
  }


}
