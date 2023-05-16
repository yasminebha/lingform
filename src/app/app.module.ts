import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuilderModule } from './pages/builder/builder.module';
import { ParagraphElementComponent } from './components/paragraph-element/paragraph-element.component';



@NgModule({
  declarations: [
    AppComponent,
    ParagraphElementComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BuilderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
