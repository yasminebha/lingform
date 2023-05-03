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

const declarations = [
  ButtonComponent,
  IconButtonComponent,
  ColorPaletteComponent,
  DropdownComponent,
  TextFieldComponent,
  ToggleComponent,
  DraggableDirective,
  CheckboxComponent,
  FileUploadComponent
];

@NgModule({
  imports: [BrowserModule],
  declarations: [...declarations, ],
  exports: [...declarations, BrowserModule],
})
export class UIComponentsModule {}
