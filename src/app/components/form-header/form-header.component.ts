import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'lg-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormHeaderComponent),
    },
  ],
})
export class FormHeaderComponent extends FormBlockComponent<string[]> implements OnInit {
title!:string
description?:string
public override value: string[] = [];
  override ngOnInit(): void {
  }
  override ngDoCheck(): void {
    super.ngDoCheck();
    this.changeCommit(this.value);
  }
  
  updateFieldValue(event: any) {
    const currentValue = event.target.value;
    console.log(currentValue);
      this.value = currentValue;
      this.changeCommit(this.value);
    }
}
