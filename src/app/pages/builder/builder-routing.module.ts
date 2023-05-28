import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { ResponsesComponent } from '../responses/responses.component';

const routes: Routes = [
  {
    path: 'builder/:id',
    component: BuilderComponent,
  },
  {path:'builder/:id/responses',component:ResponsesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
