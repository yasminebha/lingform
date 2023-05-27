import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from '../guards/auth.guard';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  { path: 'forms', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'builder',
    loadChildren: () =>
      import('./pages/builder/builder.module').then((m) => m.BuilderModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
  },
  { path: 'forms/:id/viewform', component: ViewComponent },
  { path: '', redirectTo: 'forms', pathMatch: 'full' },

  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
