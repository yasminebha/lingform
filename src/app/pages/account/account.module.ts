import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';


@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    UIComponentsModule
    
  ]
})
export class AccountModule { }
