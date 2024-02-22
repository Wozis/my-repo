import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewAdComponent } from './components/add-new-ad/add-new-ad.component';
import { AdsComponent } from './components/ads/ads.component';
import { InfoAdComponent } from './components/info-ad/info-ad.component';
import { InfoComponent } from './components/info/info.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent, 
    AdsComponent, 
    NavbarComponent, 
    InfoComponent, 
    SupportComponent, 
    SupportComponent, 
    InfoComponent, 
    ProfileComponent, 
    LoginComponent, 
    AddNewAdComponent, 
    MakeOpinionComponent, 
    ListComponent, InfoAdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
