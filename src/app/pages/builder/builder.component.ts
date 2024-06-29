
import { Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'lg-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
})
export class BuilderComponent implements OnInit {
  showModal:boolean=false
  @Output()isSaving:boolean=false

  constructor(

  ) {}
  async ngOnInit(): Promise<void> {}

}
