import { Component } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { RequestOptions,Headers, Http, URLSearchParams } from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise'; 
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ToastController } from 'ionic-angular';

import { AddAddressPage } from "../add-address/add-address";
import { MovedAddressListPage } from "../moved-address-list/moved-address-list";
import { OriginalAddressInfo } from "../../models/address-info/address-info.interface";
import { AddMovedAddressPage } from "../add-moved-address/add-moved-address";

@Component({
  selector: 'page-orig-address-list',
  templateUrl: 'orig-address-list.html',
})
export class AddressListPage {

  //addresslistRef$ : FirebaseListObservable<OriginalAddressInfo[]>;

  addresslistRef$ : any = [];
  mailerId :string;
  httpHeaders: HttpHeaders;
  firebaseObservable: FirebaseListObservable<OriginalAddressInfo[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,private http: Http, public toastCtrl: ToastController
             ) {
              this.mailerId =   this.navParams.get('companyMailerId');
              console.log(this.mailerId);
              // let apiRoot = 'https://api-qa.fusion.pitneycloud.com/fusionapi/address';

              // this.addresslistRef$ =  this.database.list('original-address-list',{
              //   query: {
              //       orderByChild: 'mailerId',
              //       equalTo: this.mailerId
              //   }
              // });

              this.firebaseObservable = this.database.list('moved-address-list',{
                query: {
                    orderByChild: 'mailerId',
                    equalTo: this.mailerId
                }
              });

              Observable.fromPromise(this.getAddressList()).merge(this.database.list('original-address-list',{
                query: {
                    orderByChild: 'mailerId',
                    equalTo: this.mailerId
                }
              })).subscribe(res => 
                this.addresslistRef$ = this.addresslistRef$.concat(res));
              
              this.firebaseObservable.$ref.limitToLast(1).on("child_added", (child) => {
                setTimeout(() => {
                  console.log(child.val());
                  this.presentToast(child.val().recipientName);
                }, 5000);
              });

  }

  presentToast(name:string) {
    let toast = this.toastCtrl.create({
      message: `User ${name} has moved to new address`,
      duration: 10000,
      position: 'top'
    });
    toast.present();
  }

  NavigateToAddAdressPage  () {
    this.navCtrl.push(AddAddressPage,{ companyMailerId : this.mailerId});
    //this.navCtrl.push(AddMovedAddressPage);
  }

  NavigateToMovedAdressPage  () {
    this.navCtrl.push(MovedAddressListPage,{ companyMailerId : this.mailerId});
  }

  getAddressList() {
    let headers = new Headers();
    headers.append("X-Api-Key", "TAHb4BcUUe4IZX8D9dFOb8D4vjRXk1195QhfqNXb")
    return this.http.get(`/shipping?mailerId=${this.mailerId}`, {
    headers: headers
    }).toPromise().then(function(data:any){
      var res = JSON.parse(data._body);
      return res.data.map(function(d){
        return {
          recipientName: d.receiverFullName,
          recipientAddress: d.destinationAddress
        }
      })
    });
  } 
 
  


}
