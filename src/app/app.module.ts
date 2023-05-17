import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParagraphElementComponent } from './components/paragraph-element/paragraph-element.component';
import { BuilderModule } from './pages/builder/builder.module';
import { metaReducers, reducers } from './store/reducers';
import { environment } from '@/environments/environment';

@NgModule({
  declarations: [AppComponent, ParagraphElementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BuilderModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
