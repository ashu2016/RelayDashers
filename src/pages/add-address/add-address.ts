import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OriginalAddressInfo } from "../../models/address-info/address-info.interface";
import { MasterMovedAddressInfo } from "../../models/address-info/master-moved-address.interface";
import { MovedAddressInfo } from "../../models/address-info/moved-address.interface";
import { AngularFireDatabase ,FirebaseListObservable  } from "angularfire2/database-deprecated";
import {Observable} from 'rxjs';
import { RequestOptions,Headers, Http, URLSearchParams } from "@angular/http";


@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  originalAddress  = {} as OriginalAddressInfo;
  originalAddressListRef$ : FirebaseListObservable<OriginalAddressInfo[]>;
  masterMovedAddressListRef$ : FirebaseListObservable<MasterMovedAddressInfo[]>;
  movedAddressListRef$ : FirebaseListObservable<MovedAddressInfo[]>;
  movedAddress = {} as MovedAddressInfo;
  movedAddressList ={} as Array<MovedAddressInfo>;
  mailerId : string;
  testlist : any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,private database:AngularFireDatabase, private http: Http) {

    this.mailerId =   this.navParams.get('companyMailerId');
    this.originalAddressListRef$ = this.database.list('original-address-list');
    this.masterMovedAddressListRef$ = this.database.list('master-moved-address-list');
    this.movedAddressListRef$ = this.database.list('moved-address-list');
  }


  addAddress(originalAddress : OriginalAddressInfo){
     this.originalAddressListRef$.push({
        recipientName : this.originalAddress.recipientName,
        recipientAddress : this.originalAddress.recipientAddress,
        mailerId : this.mailerId
    }).then((data) => {
        console.log(data);
        return this.http.get(`/originalAddress?key=${data.key}`, {
        }).toPromise().then(function(data:any){
          console.log(data);
        });
    });

      
    console.log(this.originalAddress.recipientName);
  //   this.masterMovedAddressListRef$ = this.database.list('master-moved-address-list'
  //  ,
  //  {
  //     query: {
  //       orderByChild: 'recipientName',
  //       equalTo: this.originalAddress.recipientName
  //     }
  //   });

  //    this.masterMovedAddressListRef$.forEach(items =>
  //      items.forEach( data => { 
  //                 this.movedAddressListRef$.push( { mailerId : this.mailerId,
  //                                                   recipientName : data.recipientName,
  //                                                   recipientAddress :data.recipientAddress,
  //                                                   movedAddress : data.movedAddress
  //                                                 });
  //                             console.log(this.movedAddress.movedAddress); 
  //                             }
        
  //                   ));

 

  //).map(data => this.testlist =  this.testlist.concat(data));

 
    //.filter(address => address.recipientAddress == this.originalAddress.recipientAddress)
    // .map(data => this.movedAddressList.push({
    //   recipientName : data.recipientName,
    //   recipientAddress : data.recipientAddress,
    //   movedAddress : data.movedAddress,
    //   mailerId : this.mailerId
    // }));



    this.originalAddress = {} as OriginalAddressInfo;

    this.navCtrl.pop();
  }

}
