import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressListPage  } from "../orig-address-list/orig-address-list";


@Component({
  selector: 'page-company-login',
  templateUrl: 'company-login.html',
})
export class CompanyLoginPage {

  mailerId :string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyLoginPage');
  }

  loginCompany(mailerId : string){
    this.navCtrl.push(AddressListPage,{ companyMailerId : mailerId})
  }
}
