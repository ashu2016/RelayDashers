import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import { AddAddressPage } from "../add-address/add-address";
import { OriginalAddressInfo } from "../../models/address-info/address-info.interface";

@Component({
  selector: 'page-orig-address-list',
  templateUrl: 'orig-address-list.html',
})
export class AddressListPage {

  addresslistRef$ : FirebaseListObservable<OriginalAddressInfo[]>;
  mailerId :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,private http: HttpClient
             ) {
              this.mailerId =   this.navParams.get('companyMailerId');
              console.log(this.mailerId);
              let apiRoot = 'https://api-qa.fusion.pitneycloud.com/fusionapi/address';
              let apiURL = `${apiRoot}?mailerId=${this.mailerId}`;
              // this.http.get<any>(apiURL,{
              //   headers: new HttpHeaders().set('X-Api-Key', 'TAHb4BcUUe4IZX8D9dFOb8D4vjRXk1195QhfqNXb')
              // }).subscribe(data => {
              //     console.log(data);
              //   });
             
              
              
             
              this.addresslistRef$ =  this.database.list('original-address-list',{
                query: {
                    orderByChild: 'recipientName',
                    equalTo: this.mailerId
                }
              });
  }

  NavigateToAddAdressPage  () {
    this.navCtrl.push(AddAddressPage,{ companyMailerId : this.mailerId});
  }

 
  


}
