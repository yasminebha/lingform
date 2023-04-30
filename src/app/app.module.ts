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
import { PagestatiqueComponent } from './pages/pagestatique/pagestatique.component';

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
    PagestatiqueComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
