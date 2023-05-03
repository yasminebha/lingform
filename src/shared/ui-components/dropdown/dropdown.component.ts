import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  constructor() {}
 
  @Input()
  data: Array<{ key: any; label: string }> = [];
  
  ngOnInit(): void {}

 
}
