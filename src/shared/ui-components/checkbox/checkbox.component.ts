import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  constructor() {}
  @Input()
  type: 'checkbox' | 'radio' = 'checkbox';

  @Input()
  text: string = '';
  inputStyles:string="shared";
  checkmarkStyles:string='checkmark';

  name: string = '';
  ngOnInit(): void {
    if (this.type == 'radio') {
      this.inputStyles+=" radio";
      this.checkmarkStyles+=" radio-mark"
      this.name = 'same';
    }
    else if(this.type =='checkbox'){
      this.inputStyles+=" checkbox";
      this.checkmarkStyles+=" checkbox-mark"
    }
  }
}
