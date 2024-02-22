import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  /**
   * calling services
   * @param afauth 
   */
  constructor(private afauth: AngularFireAuth) {

  }

  /**
   * register new user
   * @param email 
   * @param password 
   * @returns a promise resolve with the info of the user registed
   */
  async register(email:string, password:string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * login with email
   * @param email 
   * @param password 
   * @returns 
   */
  async login(email:string, password:string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * login with google
   * @returns 
   */
  async loginGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * get user logged
   * @returns 
   */
  getUserLogged() {
    return this.afauth.authState;
  }

  /**
   * close sesion
   */
  logout() {
    this.afauth.signOut();
  }

}
