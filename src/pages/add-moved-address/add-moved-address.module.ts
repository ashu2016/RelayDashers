import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMovedAddressPage } from './add-moved-address';

@NgModule({
  declarations: [
    AddMovedAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMovedAddressPage),
  ],
})
export class AddMovedAddressPageModule {}
