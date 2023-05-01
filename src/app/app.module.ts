import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { IconButtonComponent } from './components/button/icon-button.component';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { RightSideBarComponent } from './containers/right-side-bar/right-side-bar.component';
import { DraggableDirective } from './directives/draggable.directive';
import { TextFieldComponent } from './components/text-field/text-field.component';

import { TitreComponent } from './partials/titre/titre.component';
import { PageloginComponent } from './pages/pagelogin/pagelogin.component';
import { PageGlobleComponent } from './pages/page-globle/page-globle.component';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconButtonComponent,
    RightSideBarComponent,
    DropdownComponent,
    ColorPaletteComponent,
    ToggleComponent,
    DraggableDirective,
    TextFieldComponent,
  
    TitreComponent,
    PageloginComponent,
    PageGlobleComponent,
    PageSignInComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
