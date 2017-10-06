import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyInfo } from "../../models/company-info/company-info.interface";
import { AngularFireDatabase ,FirebaseListObservable  } from "angularfire2/database-deprecated";
import { AddressListPage } from "../orig-address-list/orig-address-list";
import { CompanyLoginPage } from "../company-login/company-login";


@Component({
  selector: 'page-register-company',
  templateUrl: 'register-company.html',
})
export class RegisterCompanyPage {

  companyInfo = {} as CompanyInfo; 
  companyListRef$ : FirebaseListObservable<CompanyInfo[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database : AngularFireDatabase) {

    this.companyListRef$ = this.database.list('company-info');
  }

  registerCompany(companyInfo : CompanyInfo){
  
    console.log(this.companyListRef$);
    this.companyListRef$.push(companyInfo);
    this.navCtrl.push(AddressListPage, { companyMailerId : companyInfo.mailerId})
  }

  navigateToLoginPage(){
    this.navCtrl.push(CompanyLoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCompanyPage');
  }

}
