import { NgModule } from '@angular/core';
import { DraggableDirective } from '../directives/draggable.directive';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './button/icon-button.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ToggleComponent } from './toggle/toggle.component';
import { BrowserModule } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseControlComponent } from './base-control.component';
import { CommonModule } from '@angular/common';

const declarations = [
  BaseControlComponent,
  ButtonComponent,
  IconButtonComponent,
  ColorPaletteComponent,
  DropdownComponent,
  TextFieldComponent,
  ToggleComponent,
  DraggableDirective,
  CheckboxComponent,
  FileUploadComponent,
];

@NgModule({
  imports: [ FormsModule,CommonModule, ReactiveFormsModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class UIComponentsModule {}
