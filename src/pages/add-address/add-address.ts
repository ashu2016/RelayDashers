import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OriginalAddressInfo } from "../../models/address-info/address-info.interface";
import { AngularFireDatabase ,FirebaseListObservable  } from "angularfire2/database-deprecated";


@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  originalAddress  = {} as OriginalAddressInfo;
  originalAddressListRef$ : FirebaseListObservable<OriginalAddressInfo[]>;
  mailerId : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database:AngularFireDatabase) {

    this.mailerId =   this.navParams.get('companyMailerId');
    this.originalAddressListRef$ = this.database.list('original-address-list');
  }


  addAddress(originalAddress : OriginalAddressInfo){
      this.originalAddressListRef$.push({
        recipientName : this.originalAddress.recipientName,
        recipientAddress : this.originalAddress.recipientAddress,
        mailerId : this.mailerId
    });

    this.originalAddress = {} as OriginalAddressInfo;

    this.navCtrl.pop();
  }

}
