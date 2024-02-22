import { Component } from '@angular/core';
import { ServiceLoginService } from '../../services/service-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  //get user
  userLogged = this.loginService.getUserLogged();
  
  /**
   * calling services
   * @param loginService 
   */
  constructor(private loginService: ServiceLoginService, private router: Router) {

  }

  /**
   * close sesion
   */
  closeSesion() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
