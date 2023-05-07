import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent implements OnInit {
  @Input()
  notRequiredLabel?: string="not Required";

  @Input()
  requiredLabel?: string="Required";


  
  constructor() {}

  ngOnInit(): void {}
}
