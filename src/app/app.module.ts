import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuilderModule } from './pages/builder/builder.module';
import { metaReducers, reducers } from './store/reducers';
import { AccountModule } from './pages/account/account.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';


@NgModule({
  declarations: [AppComponent,PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BuilderModule,
    AccountModule,
   UIComponentsModule,
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
