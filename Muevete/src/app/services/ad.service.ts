import { Injectable} from '@angular/core';
import { Ad } from '../class/ad.model';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Opinion } from '../class/opinion.model';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Year } from '../class/year';
import { City } from '../class/city';
import { Brand } from '../class/brand';
import { Ticket } from '../class/ticket';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  /**
   * calling services
   * @param firestore for login and ads
   * @param storage for images
   */
  constructor(private firestore: Firestore, private storage: Storage) {

  }


  /**
   * upload the images of the ad
   * @param event 
   * @returns url of the image
   */
  async uploadImages(event:any) : Promise<string> {
    //get the image from the event of upload files
    const image:File = event.target.files[0];
    //Creates a reference to where the image will be stored in the storage service (Storage Firebase)
    const imageAdRef = ref(this.storage, `images/${image.name}`);

    try{
      //Upload the image file to the storage service.
      await uploadBytes(imageAdRef, image);
      //Get the download URL of the uploaded image.
      const url = await getDownloadURL(imageAdRef);
      return url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * add ad to bbdd
   * @param ad to add
   */
  async adAddService(ad: Ad) {
    if(ad.selectedFiles==='') {
      ad.selectedFiles="https://firebasestorage.googleapis.com/v0/b/muevete-b0a63.appspot.com/o/images%2FnoImage.png?alt=media&token=de5b8fea-a08a-4213-8971-4632cb727682&_gl=1*20tqid*_ga*MTIwOTE5MzQ3NC4xNjgwNzA2MjY0*_ga_CW55HF8NVT*MTY4NjMzMDAxMS43OC4xLjE2ODYzMzAwNDEuMC4wLjA";
    }
    //Gets a reference to the ad collection in the database
    const adRef = collection(this.firestore, 'ad');
    //Adds a new doc to the collection
    const docRef = addDoc(adRef, this.toObject(ad));
    //Gets the id of the added doc
    const idAd = (await docRef).id;
    //Create a copy of the ad with the id
    const finalAd: Ad = { ...ad, idAd: idAd };
    //Get a ref to te doc created in the collection
    const docToUpdate = doc(adRef, idAd);
    //Update the doc with the id
    await setDoc(docToUpdate, this.toObject(finalAd));
    return idAd;
  }

  /**
   * ad object converter
   * @param objeto 
   * @returns object converted
   */
  private toObject(objeto: any): any {
    //Get the properties of the object
    const propiedades = Object.getOwnPropertyNames(objeto);
    //Create the flat object
    const objetoPlano: any = {};

    //Iterates over the properties of the original object.
    propiedades.forEach(propiedad => {
      //Assigns the property and its corresponding value of the original object to the new flat object.
      objetoPlano[propiedad] = objeto[propiedad];
    });

    return objetoPlano;
  }

  /**
   * get the obserbable of ads from the service of bbdds
   * @returns Observable array of Ads
   */
  getAds(): Observable<Ad[]> {
    //Gets a ref to the collection ad in the database
    const adRef = collection(this.firestore, 'ad');
    //Use the collectionData function to get a data observable from the 'ad' collection.
    //The parameter { idField: 'id' } indicates that the 'id' field in the documents will be used as the identifier.
    return collectionData(adRef, { idField: 'id' }) as Observable<Ad[]>;
  }

  /**
   * find ad in bbdd
   * @param idAd from the ad
   * @returns the ad
   */
  findAd(idAd: string) {
    //Get a ref to the doc of the collection 'ad' using the id
    const adRef = doc(this.firestore, 'ad', idAd);
    //Use the function docData to get the observable of the doc
    return docData(adRef).pipe(
      //Use the map operator to map the data and ensure typing as Ad.
      map(ad => ad as Ad)
    );
  }

  /**
   * remove ad
   * @param adToRemove 
   * @returns promise 
   */
  removeAd(adToRemove: Ad) {
    const adDocRef = doc(this.firestore, `ad/${adToRemove.idAd}`);
    return deleteDoc(adDocRef);
  }

  /**
   * update ad in bbdd
   * @param adToUpdate The ad to update
   * @returns A promise that resolves when the deletion is complete.
   */
  updateAd(adToUpdate: Ad): Promise<void> {
    const adDocRef = doc(this.firestore, 'ad', adToUpdate.idAd);
    const adData = this.toObject(adToUpdate);
    return updateDoc(adDocRef, adData);
  }

  /**
   * add user in list of fav of the ad
   * @param ad 
   * @param user
   * @returns 
   */
  adFavAddService(ad: Ad, user: string) {
    ad.userFavs.push(user);

    this.updateAd(ad);

    alert("Se ha añadio a favoritos");
  }

  /**
   * remove user from the fav list of the ad
   * @param adToRemove 
   * @param user
   * @returns 
   */
  removeFavAd(adToRemove: Ad, user: string) {
    for (let i = 0; i < adToRemove.userFavs.length; i++) {
      if (adToRemove.userFavs[i] == user) {
        adToRemove.userFavs.splice(i, 1);
      }
    }

    this.updateAd(adToRemove);

    alert("Se ha eliminado de favoritos");
  }

  /**
   * add opinion of user to bbdd
   * @param opinion
   * @returns id of added opinion
   */
  async addOpinionService(opinion: Opinion) {
    //Get a ref of collection 'opinions' of the database
    const opRef = collection(this.firestore, 'opinions');
    //Add new doc to the collection with the data
    const docRef = addDoc(opRef, this.toObject(opinion));
    //Gets te id of the doc
    const idOp = (await docRef).id;
    //Create a copy of the opinion with the id
    const finalAd: Opinion = { ...opinion, idOp: idOp };
    //Gets a ref to the created doc in the collection
    const docToUpdate = doc(opRef, idOp);
    //Update the doc with the id
    await setDoc(docToUpdate, this.toObject(finalAd));
    //Return the id of the opinion
    return idOp;
  }

  /**
   * get the obserbable of opinions from the service of bbdds
   */
  getOp(): Observable<Opinion[]> {
    const adRef = collection(this.firestore, 'opinions');
    return collectionData(adRef, { idField: 'id' }) as Observable<Opinion[]>;
  }

  /**
   * remove opinion of user from bbdd
   * @param opinion 
   * @returns 
   */
  removeOpinion(opinion: Opinion) {
    const opDocRef = doc(this.firestore, `opinions/${opinion.idOp}`);
    return deleteDoc(opDocRef);
  }

  /**
   * get the obserbable of brands from the service of bbdd to the filter
   */
  getCities(): Observable<City[]> {
    const cityRef = collection(this.firestore, 'cities');
    return collectionData(cityRef, { idField: 'idCity' }) as Observable<City[]>;
  }

  /**
   * get the obserbable of cities from the service of bbdd to the filter
   */
  getBrands(): Observable<Brand[]> {
    const brandRef = collection(this.firestore, 'brands');
    return collectionData(brandRef, { idField: 'idBrand' }) as Observable<Brand[]>;
  }

  /**
   * get the obserbable of years from the service of bbdd to the filter
   */
  getYears(): Observable<Year[]> {
    const yearRef = collection(this.firestore, 'years');
    return collectionData(yearRef, { idField: 'idYear' }) as Observable<Year[]>;
  }

  /**
   * add ticket to bbdd
   * @param ticket to add
   */
  async adTicketService(ticket: Ticket) {
    const ticketRef = collection(this.firestore, 'tickets');
    const docRef = await addDoc(ticketRef, this.toObject(ticket));
    const idTicket = (await docRef).id;
    const finalAd: Ticket = { ...ticket, idTicket: idTicket };
    const docToUpdate = doc(ticketRef, idTicket);
    await setDoc(docToUpdate, this.toObject(finalAd));
    return idTicket;
  }
}
