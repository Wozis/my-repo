export class Opinion {

    idOp!: string;
    ad!:string;
    titleOp!: string;
    opinion!: string;
    stars!: number;
    idUserMake: string | undefined = '';
    idUserDest!: string;

    constructor(idOp: string, titleOp: string, opinion: string, stars: number, idUserMake: string, idUserDest: string, ad: string) {
        this.idOp = idOp;
        this.titleOp = titleOp;
        this.opinion = opinion;
        this.stars = stars;
        this.idUserMake = idUserMake;
        this.idUserDest = idUserDest;
        this.ad = ad;
    }
}