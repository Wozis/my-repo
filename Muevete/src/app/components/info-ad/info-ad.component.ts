import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/class/ad.model';
import { AdService } from 'src/app/services/ad.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-info-ad',
  templateUrl: './info-ad.component.html',
  styleUrls: ['./info-ad.component.css']
})
export class InfoAdComponent {
  //ad variables
  idAd: string = '';
  nameUserOfAd?: string = '';
  isLoggedIn: boolean = false;
  nameUserLogged!: string;
  userLogged = this.loginService.getUserLogged();
  titleAd: string = '';
  brandAd: string = '';
  modelAd: string = '';
  priceAd: number = 0;
  yearOfProductionAd: number = 0;
  mileageAd: number = 0;
  consumptionAd: number = 0;
  sellRentAd!: string;
  descriptionAd: string = '';
  locationAd: string = '';
  phoneAd: number = 0;
  selectedFiles: string = '';
  userFavs: string[] = [""];
  ad!: Ad;

  constructor(private adService: AdService, private route: ActivatedRoute, private loginService: ServiceLoginService) {

  }

  ngOnInit(): void {
    //user logged
    //get user
    this.loginService.getUserLogged().subscribe (user => {
      if (user) {
        this.nameUserLogged = user.email ?? '';
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    //take ad selected
    this.idAd = this.route.snapshot.params['idAd'];
    this.adService.findAd(this.idAd).subscribe(ad => {
      if (ad) {
        this.ad = ad;

        if (this.ad && this.ad.idUser) {
          this.nameUserOfAd = this.ad.idUser;
        }  

        // Assign values to component variables
        this.nameUserOfAd = this.ad.idUser ?? '';
        this.titleAd = this.ad.titleAd;
        this.brandAd = this.ad.brandAd;
        this.modelAd = this.ad.modelAd;
        this.priceAd = this.ad.priceAd;
        this.yearOfProductionAd = this.ad.yearOfProductionAd;
        this.mileageAd = this.ad.mileageAd;
        this.consumptionAd = this.ad.consumptionAd;
        this.sellRentAd = this.ad.sellRentAd;
        this.locationAd = this.ad.locationAd;
        this.phoneAd = this.ad.phoneAd;
        this.descriptionAd = this.ad.descriptionAd;
        this.selectedFiles = this.ad.selectedFiles;
        this.userFavs = this.ad.userFavs;
      }

    });
  }

  checkStatusFav(ad:Ad): boolean {
    if (ad && ad.userFavs) {
      return ad.userFavs.includes(this.nameUserLogged);
    }
    return false;
  }

  /**
   * add ad to favs
   * @param ad to add
   */
  addFav(ad:Ad) {
    this.adService.adFavAddService(ad, this.nameUserLogged);
  }

  /**
   * remove ad from ads
   * @param ad to remove
   */
  quitFav(ad: Ad) {
    this.adService.removeFavAd(ad, this.nameUserLogged);
  }

}
