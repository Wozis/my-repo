import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/class/ad.model';
import { AdService } from 'src/app/services/ad.service';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  //user logged
  userLogged = this.loginService.getUserLogged();
  //user
  isLoggedIn: boolean = false;
  userName!: string;
  acction!: string | null;
  ads: Ad[] = [];
  allAds: Ad[] = [];
  getID: DocumentData[] = [];
  ids:string[] = [];

  /**
  * calling services
  * @param route 
  * @param serviceAd 
  * @param loginService 
  * @param router 
  */
  constructor(private route: ActivatedRoute, private serviceAd: AdService, private loginService: ServiceLoginService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const acction = params.get('acction');
      this.acction = acction;
    })

    //get ads from bbdd
    this.serviceAd.getAds().subscribe(adsBBDD => {
      this.allAds = adsBBDD;
    });

    //get user
    this.loginService.getUserLogged().subscribe (user => {
      if (user) {
        this.userName = user.email ?? '';
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  chargeFavAds() {
    this.ads = [];
    for (let i = 0; i < this.allAds.length; i++) {
      for (let j = 0; j < this.allAds[i].userFavs.length; j++) {
        if (this.allAds[i].userFavs[j] === this.userName) {
          this.ads.push(this.allAds[i]);
        }
      }
    }
  }

  chargeMyAds() {
    this.ads = [];
    for (let i = 0; i < this.allAds.length; i++) {
      if (this.allAds[i].idUser === this.userName) {
        this.ads.push(this.allAds[i]);
      }
    }
  }

  changeArray() {
    if (this.acction === '1') {
      this.chargeFavAds();
      return true;
    } else if (this.acction === '2') {
      this.chargeMyAds();
      return false;
    }
    return undefined;
  }

  /**
   * add ad to favs
   * @param ad 
   */
  addFav(ad: Ad) {
    this.serviceAd.adFavAddService(ad, this.userName);
  }

  /**
   * remove ad from ads
   * @param ad 
   */
  quitFav(ad: Ad) {
    this.serviceAd.removeFavAd(ad, this.userName);
  }

  checkStatusFav(ad: Ad): boolean {
    for (let i = 0; i < ad.userFavs.length; i++) {
      if (ad.userFavs[i] == this.userName) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  makeOpinion(ad: Ad) {
    this.router.navigate(["/opinionPage", ad.idAd]);
  }


}