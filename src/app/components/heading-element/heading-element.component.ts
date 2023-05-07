import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { element } from '../../../shared/mock-data/element1';

@Component({
  selector: 'lg-heading-element',
  templateUrl: './heading-element.component.html',
  styleUrls: ['./heading-element.component.css'],
})
export class HeadingElementComponent implements OnInit {
  mode: 'edit' | 'live' = 'live';
  type?: string;
  text?: string;
  description?: string;

  headingControl = new FormControl('');
  descriptionControl = new FormControl('');
  headingForm!: FormGroup;
  constructor(private readonly fb: FormBuilder) {}
  headingFontSize: string = '24';
  // questionFontSize!:number;
  // textFontSize!:number;
  // questionType!:string;
  async ngOnInit(): Promise<void> {
    this.type = element.type;
    this.text = element.text;
    this.description = element.description;
    console.log(this.headingFontSize);
    this.headingForm = this.fb.group({
      headingControl: ['', [Validators.required]],
      descriptionControl: [''],
    });
  }
  async submit(): Promise<void> {
    if (this.headingForm) alert(JSON.stringify(this.headingForm.value));
  }
}
