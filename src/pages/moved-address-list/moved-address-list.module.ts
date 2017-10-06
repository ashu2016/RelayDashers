import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovedAddressListPage } from './moved-address-list';

@NgModule({
  declarations: [
    MovedAddressListPage,
  ],
  imports: [
    IonicPageModule.forChild(MovedAddressListPage),
  ],
})
export class MovedAddressListPageModule {}
