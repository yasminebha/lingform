import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageloginComponent } from './pages/pagelogin/pagelogin.component';
import { PageGlobleComponent } from './pages/page-globle/page-globle.component';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';

const routes: Routes = [
  {path:'home', component: PageGlobleComponent}, 
  {path:'login', component: PageloginComponent},
  {path:'signin', component: PageSignInComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
