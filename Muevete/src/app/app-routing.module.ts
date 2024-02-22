import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewAdComponent } from './components/add-new-ad/add-new-ad.component';
import { AdsComponent } from './components/ads/ads.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { InfoAdComponent } from './components/info-ad/info-ad.component';
import { InfoComponent } from './components/info/info.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MakeOpinionComponent } from './components/make-opinion/make-opinion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';

const routes:Routes=[
  {path:'', component:AdsComponent},
  {path:'support',component:SupportComponent},
  {path:'info',component:InfoComponent},
  {path:'list/:acction',component:ListComponent},
  {path:'addNewAdd/:idAd', component:AddNewAdComponent},
  {path:'addNewAdd', component:AddNewAdComponent},
  {path:'profile',component:ProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'opinionPage/:idAdOp',component:MakeOpinionComponent},
  {path:'infoAd/:idAd', component:InfoAdComponent},
  {path:'**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
