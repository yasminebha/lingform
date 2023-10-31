import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lg-form-list-item',
  templateUrl: './form-list-item.component.html',
  styleUrls: ['./form-list-item.component.css']
})
export class FormListItemComponent implements OnInit {

  constructor() { }
    @Input()
    formTitle:string='Untitled Form'

    @Input()
    createdAt:string='mon 12 2023'
  ngOnInit(): void {
  }

}
