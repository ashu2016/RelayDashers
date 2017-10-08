import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MasterMovedAddressInfo } from "../../models/address-info/master-moved-address.interface";
import { AngularFireDatabase ,FirebaseListObservable  } from "angularfire2/database-deprecated";


@Component({
  selector: 'page-add-moved-address',
  templateUrl: 'add-moved-address.html',
})
export class AddMovedAddressPage {

  movedMaster  = {} as MasterMovedAddressInfo;
  masterMovedAddressListRef$ : FirebaseListObservable<MasterMovedAddressInfo[]>;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,private database:AngularFireDatabase) {

    
    this.masterMovedAddressListRef$ = this.database.list('master-moved-address-list');
  }


  addMovedAddress(movedMaster : MasterMovedAddressInfo){
      this.masterMovedAddressListRef$.push({
        recipientName : this.movedMaster.recipientName,
        recipientAddress : this.movedMaster.recipientAddress,
        movedAddress : this.movedMaster.movedAddress
    });
   
    this.movedMaster = {} as MasterMovedAddressInfo;

  }

}
