import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderComponent } from '../builder/builder.component';
import { FormBuilderComponent } from '@/app/containers/form-builder/form-builder.component';
import { LeftSideBarComponent } from '@/app/containers/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from '@/app/containers/right-side-bar/right-side-bar.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { InputComponentsComponent } from '@/app/components/input-components/input-components.component';
import { HeadingElementComponent } from '@/app/components/heading-element/heading-element.component';
import { MultipleChoiceElementComponent } from '@/app/components/multiple-choice-element/multiple-choice-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortAnswerComponent } from '@/app/components/short-answer/short-answer.component';
import { OneChoiceComponent } from '@/app/components/one-choice/one-choice.component';
import { EmailElementComponent } from '../../components/email-element/email-element.component';
import { PhoneElementComponent } from '../../components/phone-element/phone-element.component';
import { DateElementComponent } from '@/app/components/date-element/date-element.component';
import { FormHeaderComponent } from '@/app/components/form-header/form-header.component';



@NgModule({
  declarations: [
    BuilderComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    FormBuilderComponent,
    InputComponentsComponent,
    HeadingElementComponent,
    MultipleChoiceElementComponent,
    ShortAnswerComponent,
    OneChoiceComponent,
    EmailElementComponent,
    PhoneElementComponent,
    DateElementComponent,
    FormHeaderComponent,
    
   
  ],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BuilderRoutingModule,
    UIComponentsModule,
   
  ]
})
export class BuilderModule { }
