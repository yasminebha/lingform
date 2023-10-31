import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { UIComponentsModule } from '@/shared/ui-components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    UIComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
