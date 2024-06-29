import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeSideBarComponent } from '../../components/home-side-bar/home-side-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    HomeSideBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UIComponentsModule,
    NgxPaginationModule,
  ],
  schemas: [NO_ERRORS_SCHEMA,],
})
export class HomeModule { }
