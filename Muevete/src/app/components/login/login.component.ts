import { Component } from '@angular/core';
import { ServiceLoginService } from '../../services/service-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //dates of user
  user={
    email: '',
    password: ''
  }
  emailRegister!: string;
  passwordRegister!: string;

  /**
   * callinng services
   * @param loginService 
   * @param router 
   */
  constructor(private loginService:ServiceLoginService, private router:Router) {

  }

  /**
   * login with email
   */
  login() {
    const {email, password} = this.user;
    this.loginService.login(email, password).then(res => {
      console.log("Se registro correctamente");
    });
  }

  /**
   * login with google
   */
  loginGoogle() {
    this.loginService.loginGoogle().then(res => {
      console.log("Se registro correctamente");
    });
  }

  /**
   * register new user
   */
  register() {
    this.loginService.register(this.emailRegister, this.passwordRegister).then(res => {
      console.log("Se registro correctamente");
    });
  }

  /**
   * route to home
   */
  goHome() {
    this.router.navigate(['']);
  }
}
