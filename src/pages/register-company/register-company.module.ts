import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCompanyPage } from './register-company';

@NgModule({
  declarations: [
    RegisterCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCompanyPage),
  ],
})
export class RegisterCompanyPageModule {}
