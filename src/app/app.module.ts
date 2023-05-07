import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingElementComponent } from './components/heading-element/heading-element.component';
import { LeftSideBarComponent } from './containers/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './containers/right-side-bar/right-side-bar.component';
import { InputComponentsComponent } from './components/input-components/input-components.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleChoiceElementComponent } from './components/multiple-choice-element/multiple-choice-element.component';
import { FormBuilderComponent } from './containers/form-builder/form-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponentsComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    HeadingElementComponent,
    MultipleChoiceElementComponent,
    FormBuilderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
