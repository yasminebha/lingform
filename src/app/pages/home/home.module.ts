import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UIComponentsModule
  ],
  schemas: [NO_ERRORS_SCHEMA,],
})
export class HomeModule { }
