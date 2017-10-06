import { Component } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { RequestOptions,Headers, Http, URLSearchParams } from "@angular/http";
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
  httpHeaders: HttpHeaders;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,private http: Http
             ) {
              this.mailerId =   this.navParams.get('companyMailerId');
              console.log(this.mailerId);
              // let apiRoot = 'https://api-qa.fusion.pitneycloud.com/fusionapi/address';

              // let myHeaders = new Headers();
              // myHeaders.append('Content-Type', 'application/json1');    
              // let myParams = new URLSearchParams();
              // myParams.append('mailerId',this.mailerId);	
              // let myoptions = new RequestOptions({ headers: myHeaders, params: myParams });

              // let headers = new Headers();
              // headers.set('X-Api-Key', 'TAHb4BcUUe4IZX8D9dFOb8D4vjRXk1195QhfqNXb');
              // let opts = new RequestOptions();
              // opts.headers = headers;
              // let params = new URLSearchParams();
              // params.set('mailerId',this.mailerId);
              // opts.params = params;
              // console.log(opts);

              // let apiURL = `${apiRoot}?mailerId=${this.mailerId}`;
              
              // this.httpHeaders =  new HttpHeaders()
              // this.httpHeaders.append('X-Api-Key', 'TAHb4BcUUe4IZX8D9dFOb8D4vjRXk1195QhfqNXb');
              
              // this.http.get(apiRoot,myoptions).subscribe(data => {
              //     console.log(data);
              //   });
             
              
              
             
              this.addresslistRef$ =  this.database.list('original-address-list',{
                query: {
                    orderByChild: 'mailerId',
                    equalTo: this.mailerId
                }
              });

              this.addresslistRef$.forEach(t =>console.log(t))
  }

  NavigateToAddAdressPage  () {
    this.navCtrl.push(AddAddressPage,{ companyMailerId : this.mailerId});
  }

 
  


}
