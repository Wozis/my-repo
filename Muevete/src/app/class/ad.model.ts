export class Ad {

    idAd!: string;
    idUser: string | undefined = '';
    titleAd: string = '';
    brandAd: string = '';
    modelAd: string = '';
    priceAd: number = 0;
    yearOfProductionAd: number = 0;
    mileageAd: number = 0;
    consumptionAd: number = 0;
    sellRentAd!: string;
    locationAd: string = '';
    phoneAd: number = 0;
    descriptionAd: string = '';
    selectedFiles: string;
    userFavs: string[] = [];

    constructor(idAd:string, idUser: string | undefined, titleAd: string, brandAd: string, modelAd: string, priceAd: number, yearOfProductionAd: number, mileageAd: number,
    consumptionAd: number, sellRentAd: string, locationAd: string, phoneAd: number, descriptionAd: string, selectedFiles: string, userFavs: string[]) {
        this.idAd = idAd;
        this.idUser = idUser;
        this.titleAd = titleAd;
        this.brandAd = brandAd;
        this.modelAd = modelAd;
        this.priceAd = priceAd;
        this.yearOfProductionAd = yearOfProductionAd;
        this.mileageAd = mileageAd;
        this.consumptionAd = consumptionAd;
        this.sellRentAd = sellRentAd;
        this.locationAd = locationAd;
        this.phoneAd = phoneAd;
        this.descriptionAd = descriptionAd;
        this.selectedFiles = selectedFiles;
        this.userFavs = userFavs;
    }

}