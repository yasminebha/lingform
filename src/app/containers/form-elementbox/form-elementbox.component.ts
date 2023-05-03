import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lg-form-elementbox',
  templateUrl: './form-elementbox.component.html',
  styleUrls: ['./form-elementbox.component.css']
  
})
export class FormElementboxComponent implements OnInit {

  constructor() { }
  headingFontSize!:number;
  questionFontSize!:number;
  textFontSize!:number;
  questionType!:string;
  ngOnInit(): void {
  }

}
