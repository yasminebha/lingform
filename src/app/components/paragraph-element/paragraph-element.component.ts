import { Component, OnInit } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

@Component({
  selector: 'app-paragraph-element',
  templateUrl: './paragraph-element.component.html',
  styleUrls: ['./paragraph-element.component.css']
})
export class ParagraphElementComponent extends ShortAnswerComponent implements OnInit {

  

  override ngOnInit(): void {
  }

}
