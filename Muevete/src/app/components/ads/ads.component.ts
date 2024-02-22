import { Component, OnInit } from "@angular/core";
import { Ad } from "../../class/ad.model";
import { AdService } from "../../services/ad.service";
import { and } from "firebase/firestore";
import { Router } from "@angular/router";
import { ServiceLoginService } from "../../services/service-login.service";
import { City } from "src/app/class/city";
import { Brand } from "src/app/class/brand";
import { Year } from "src/app/class/year";

@Component({

    selector: "app-ads",
    templateUrl: "./ads.component.html",
    styleUrls: ['./ads.component.css']

})
export class AdsComponent implements OnInit {

  //user
  isLoggedIn: boolean = false;
  userName!: string;
  //variable filter
  selectedCity: string = 'Todas';
  selectedBrand: string = 'Todas';
  selectedTypeAd: string = 'Todos';
  selectedYear: string = 'Todos';
  cities: City[] = [];
  brands: Brand[] = [];
  years: Year[] = [];

  
  //array with all ads
  allAds: Ad[] = [
    
  ];

  //array with result of filters
  resultAds : Ad[] = [

  ];

  /**
   * calling services
   * @param adService 
   * @param router 
   * @param loginService 
   */
  constructor(private adService:AdService, private router:Router, private loginService: ServiceLoginService) {
    
  }

  ngOnInit(): void {
    //get ads from bbdd
    this.adService.getAds().subscribe(ads => {
      this.allAds = ads;
      this.resultAds = this.allAds;
    });

    //get filters from bbdd
    this.adService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cities.sort((a, b) => a.city.localeCompare(b.city));
    });

    this.adService.getBrands().subscribe(brands => {
      this.brands = brands;
      this.brands.sort((a, b) => a.brand.localeCompare(b.brand));
    });

    this.adService.getYears().subscribe(years => {
      this.years = years;
      this.years.sort((a, b) => a.year - b.year);
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

  ngAfterViewInit() {
    
  }

  /**
   * filter ads with the params
   */
  filterAds() {
    if (
      this.selectedCity === 'Todas' &&
      this.selectedBrand === 'Todas' &&
      this.selectedTypeAd === 'Todos' &&
      this.selectedYear === 'Todos'
    ) {
      this.resultAds = this.allAds;
    } else {
      this.resultAds = this.allAds.filter(ad => {
        return (
          (this.selectedCity === 'Todas' || ad.locationAd === this.selectedCity) &&
          (this.selectedBrand === 'Todas' || ad.brandAd === this.selectedBrand) &&
          (this.selectedTypeAd === 'Todos' || ad.sellRentAd === this.selectedTypeAd) &&
          (this.selectedYear === 'Todos' || ad.yearOfProductionAd.toString() === this.selectedYear)
        );
      });
    }
  }

  /**
   * add ad to favs
   * @param ad to add
   */
  addFav(ad:Ad) {
    this.adService.adFavAddService(ad, this.userName);
  }

  /**
   * remove ad from ads
   * @param ad to remove
   */
  quitFav(ad: Ad) {
    this.adService.removeFavAd(ad, this.userName);
  }
   

  checkStatusFav(ad:Ad): boolean {
    for (let i=0; i < ad.userFavs.length; i++) {
      if(ad.userFavs[i] == this.userName) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
    
}