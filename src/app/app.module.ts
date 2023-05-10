import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuilderModule } from './pages/builder/builder.module';
import { BuilderComponent } from './pages/builder/builder.component';
import { ShortAnswerComponent } from './components/short-answer/short-answer.component';
import { OneChoiceComponent } from './components/one-choice/one-choice.component';

@NgModule({
  declarations: [
    AppComponent,
   
   
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
