import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";

import { RelayDashers } from './app.component';
import { RegisterCompanyPage } from '../pages/register-company/register-company';
import { AddAddressPage } from '../pages/add-address/add-address';
import { AddressListPage } from "../pages/orig-address-list/orig-address-list";
import { FIREBASE_CREDENTIALS } from "./firebase.credentials";

@NgModule({
  declarations: [
    RelayDashers,
    RegisterCompanyPage,
    AddAddressPage,
    AddressListPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(RelayDashers),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // IMport the AngularFireDatabaseModule for database interaction with Firebase.
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RelayDashers,
    RegisterCompanyPage,
    AddAddressPage,
    AddressListPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
