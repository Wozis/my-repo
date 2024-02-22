import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import { Opinion } from 'src/app/class/opinion.model';
import { AdService } from 'src/app/services/ad.service';
import { Ad } from 'src/app/class/ad.model';

@Component({
  selector: 'app-make-opinion',
  templateUrl: './make-opinion.component.html',
  styleUrls: ['./make-opinion.component.css']
})
export class MakeOpinionComponent implements OnInit {

  //user
  userLogged = this.loginService.getUserLogged();
  //variables of opinion
  idOpinion: number = 0;
  ad!: Ad;
  idAd!:string;
  idUser!:string;
  titleOpinion: string = '';
  opinionString: string = '';
  puntuation: number = -1;
  emailUser: string = '';
  opinion!: Opinion;
  
  /**
   * calling services
   * @param router 
   * @param route 
   * @param loginService 
   */
  constructor(private router:Router, private route:ActivatedRoute, private loginService:ServiceLoginService, private serviceAd: AdService) {

  }

  ngOnInit(): void {
    //get user logged
    this.userLogged.subscribe(user => {
      if(!user) {
        this.router.navigate(['/login']);
      } else {
        if(user.email!=null) {
          this.emailUser = user.email;
        }
      }
    });

    this.idAd = this.route.snapshot.params['idAdOp'];
    this.serviceAd.findAd(this.idAd).subscribe(ad => {
      this.ad = ad;

      if (this.ad.idUser != undefined) {
        this.idUser = this.ad.idUser;
      }
    });
  }

  /**
   * send opinion
   */
  sendOpinion() {
    this.opinion = new Opinion('', this.titleOpinion, this.opinionString, this.puntuation, this.emailUser, this.idUser, this.ad.titleAd + " del coche " + this.ad.brandAd + " " + this.ad.modelAd);
    this.serviceAd.addOpinionService(this.opinion);
    alert("Se añadió la opinión correctamente");
    this.router.navigate([""]);
    console.log(this.idUser);
  }

  /**
   * check to button status
   */
  checkFields(){
    if (this.titleOpinion=="" || this.opinionString=="" || this.puntuation < 0) {
      return true;
    } else {
      return false;
    }
  }

}
