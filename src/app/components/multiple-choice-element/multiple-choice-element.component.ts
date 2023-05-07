import { Component, OnInit } from '@angular/core';
import { checkboxList } from '@/shared/mock-data/multiple-choice';
@Component({
  selector: 'lg-multiple-choice-element',
  templateUrl: './multiple-choice-element.component.html',
  styleUrls: ['./multiple-choice-element.component.css']
})
export class MultipleChoiceElementComponent implements OnInit {
  mode: 'edit' | 'live' = 'live';
  checkboxOptions = checkboxList;
  constructor() { }

  ngOnInit(): void {
    this.checkboxOptions=checkboxList;
    console.log(this.checkboxOptions);
    
  }
  onClick(){
    console.log('works')
  }

}
