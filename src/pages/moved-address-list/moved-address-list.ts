import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import { MovedAddressInfo } from "../../models/address-info/moved-address.interface";

@Component({
  selector: 'page-moved-address-list',
  templateUrl: 'moved-address-list.html',
})
export class MovedAddressListPage {

  movedaddresslistRef$ : FirebaseListObservable<MovedAddressInfo[]>;
  mailerId :string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.mailerId =   this.navParams.get('companyMailerId');

    this.movedaddresslistRef$ =  this.database.list('moved-address-list',{
      query: {
          orderByChild: 'mailerId',
          equalTo: this.mailerId
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovedAddressListPage');
  }

}
