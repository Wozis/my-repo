import { Component, OnInit } from '@angular/core';
import { Ad } from '../../class/ad.model';
import { AdService } from '../../services/ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-add-new-ad',
  templateUrl: './add-new-ad.component.html',
  styleUrls: ['./add-new-ad.component.css']
})
export class AddNewAdComponent implements OnInit {
  
  //ad variables
  idAd: string = '';
  nameUserLogged?: string = '';
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
  userFavs: string[] = [];
  ad!: Ad;
  //msj to add ad service
  mensaje = "";
  aniadido = false;
  //bolean for button status
  statusButton = true;
  typeButton = false;
  //filter variables
  cities = ['Andalucia', 'Aragon', 'Asturias', 'Baleares', 'Canarias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'La Rioja', 'Madrid', 'Murcia', 'Navarra', 'Extremadura', 'Galicia', 'Pais Vasco', 'Valencia'];
  brands = ['Abarth', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Citroën', 'Dacia', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'KIA',
  'Land Rover', 'Lexus', 'Lotus', 'Maserati', 'Mazda', 'Mercedes', 'MINI', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'SEAT', 'Skoda', 'Toyota', 'Volkswagen'];
  years = [2000, 2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  /**
   * services call
   * @param adService
   * @param router 
   * @param loginService 
   */
  constructor(private adService: AdService, private router: Router, private route: ActivatedRoute, private loginService: ServiceLoginService) {

  }

  /**
   * get user logged
   */
  ngOnInit(): void {
    //user logged
    this.userLogged.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.nameUserLogged = user.email ?? '';
      }
    })

    //take ad selected
    this.route.params.subscribe(params => {
      this.idAd = params['idAd'] || null;
    });

    if (this.idAd !== null) {
      this.adService.findAd(this.idAd).subscribe(ad => {
        this.ad = ad;
  
        if (this.ad.idUser !== this.nameUserLogged) {
          this.router.navigate(['']);
        } else {
          // Assign values to component variables
          this.titleAd = this.ad.titleAd;
          this.nameUserLogged = this.ad.idUser;
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
          this.typeButton = true;
        }
      });
    }
  
  }

  /**
   * add ad calling service
   */
  addAd() {
    this.ad = new Ad('', this.nameUserLogged, this.titleAd, this.brandAd, this.modelAd, this.priceAd, this.yearOfProductionAd, this.mileageAd, this.consumptionAd, this.sellRentAd, this.locationAd, this.phoneAd, this.descriptionAd, this.selectedFiles, []);
    this.adService.adAddService(this.ad);
  }
  
  /**
   * alert when ad is added
   */
  addAdMessage() {
    this.mensaje = "El anuncio " + this.titleAd + " añadido correctamente";
    this.aniadido = true;
  }

  /**
   * change button status
   */
  getButtonStatus(): boolean {
    if (this.titleAd==='' || this.brandAd==='' || this.modelAd==='' ||  this.priceAd<1 || this.yearOfProductionAd===0 || this.mileageAd<1 ||
    this.consumptionAd<1 || this.locationAd==='' || this.phoneAd.toString().length != 9 || this.sellRentAd==='' || this.locationAd==='' || this.descriptionAd==='') {
      return true;
    } else {
      return false;
    }
  }

  modifyAd() {
    this.ad = new Ad(this.idAd, this.nameUserLogged, this.titleAd, this.brandAd, this.modelAd, this.priceAd, this.yearOfProductionAd, this.mileageAd, this.consumptionAd, this.sellRentAd, this.locationAd, this.phoneAd, this.descriptionAd, this.selectedFiles, this.userFavs);
    this.adService.updateAd(this.ad);

    alert("El anuncio se ha modificado correctamente");

    this.router.navigate([""]);
  }

  /**
   * remove ad
   */
  adRemoved() {
    this.adService.removeAd(this.ad);

    alert("El anuncio se ha eliminado correctamente");

    this.router.navigate([""]);
  }

  /**
   * take files
   * @param event 
   */
  onFileChange(event:any) {
    this.adService.uploadImages(event).then(url => {
      this.selectedFiles = url;
    });
  }
  
  /**
   * when ad is added user go back to home
   */
  backHome() {
    this.router.navigate(['']);
  }

}
