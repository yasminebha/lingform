import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lg-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.css']
})
export class ShortAnswerComponent implements OnInit {
  mode: 'edit' | 'live' = 'edit';

  constructor() { }

  ngOnInit(): void {
  }

}
