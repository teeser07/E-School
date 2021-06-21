import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SharedComponentsModule } from '../shared/theme/components/shared-components.module';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupService } from './signup/signup.service';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    SignupService
  ]
})
export class AccountModule { }
