import { Component, OnInit } from '@angular/core';
import { ServiceLoginService } from '../../services/service-login.service';
import { Router } from '@angular/router';
import { Opinion } from 'src/app/class/opinion.model';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //get user
  userLogged = this.loginService.getUserLogged();
  userName!:string;
  //opinion
  userMakeOp!:string;
  title!:string;
  opinion!:string;
  stars!:number;
  myOpinions: Opinion[] = [
    
  ];
  otherOpinions: Opinion[] = [

  ];

  /**
   * calling services
   * @param loginService 
   * @param router 
   */
  constructor(private loginService:ServiceLoginService, private router:Router, private adService:AdService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userLogged.subscribe(user => {
        if(!user) {
          this.router.navigate(['/login']);
        } else {
          this.userName = user.email ?? '';
          this.adService.getOp().subscribe(ops => {
            this.myOpinions = ops.filter(op=>{
              return (
                (op.idUserMake === this.userName)
              );
            });
            this.otherOpinions = ops.filter(op => {
              return (
                (op.idUserDest === this.userName)
              );
            });
          });
        }
      })
    }, 3500);
    
  }

  

  /**
   * get user loged
   */
  getUser() {
    this.loginService.getUserLogged().subscribe(res => {
      console.log(res?.email);
    });
  }

  removeOp(op: Opinion) {
    this.adService.removeOpinion(op);
  }

}
