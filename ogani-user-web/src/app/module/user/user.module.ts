import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoggegOutComponent } from './pages/loggeg-out/loggeg-out.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { AuthService } from './auth.service';
import { UserComponent } from './user.component';
import { SessionStoreService } from './session-store.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoggegOutComponent,
    UserComponent
  ],
  providers: [
    UserService,
    AuthService,
    SessionStoreService
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoggegOutComponent,
    UserComponent
  ]
})
export class UserModule { }

export enum MsgStatus {
  SUCCESS = 'alert-success',
  ERROR = 'alert-danger',
  NONE = 'NONE'
}
