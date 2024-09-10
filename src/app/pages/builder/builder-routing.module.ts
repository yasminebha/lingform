import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { ResponsesComponent } from '../responses/responses.component';
import { AuthGuard } from '@/guards/auth.guard';
import { FormSettingsComponent } from '../form-settings/form-settings.component';

const routes: Routes = [
  {
    path: 'builder/:id',
    component: BuilderComponent, canActivate: [AuthGuard]
  },
  {path:'builder/:id/responses',component:ResponsesComponent, canActivate: [AuthGuard]},
  {path:'builder/:id/settings',component:FormSettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
