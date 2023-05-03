import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormElementboxComponent } from './containers/form-elementbox/form-elementbox.component';
import { LeftSideBarComponent } from './containers/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './containers/right-side-bar/right-side-bar.component';
import { InputComponentsComponent } from './components/input-components/input-components.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponentsComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    FormElementboxComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, UIComponentsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
