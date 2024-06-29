import { NgModule } from '@angular/core';
import { DraggableDirective } from '../directives/draggable.directive';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './button/icon-button.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ToggleComponent } from './toggle/toggle.component';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseControlComponent } from './base-control.component';
import { CommonModule } from '@angular/common';
import { FormListItemComponent } from './form-list-item/form-list-item.component';
import { NumberSliderComponent } from './number-slider/number-slider.component';

@NgModule({
  declarations: [
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
    FormListItemComponent,
    NumberSliderComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule
    ],
  exports: [
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
    FormListItemComponent,
    NumberSliderComponent
  ],
})
export class UIComponentsModule {}
