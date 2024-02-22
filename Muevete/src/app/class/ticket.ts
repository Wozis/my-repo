export class Ticket {

    idTicket!:string;
    email!:string;
    name!:string;
    title!:string;
    description!:string;

    constructor(idTicket:string, email:string, name:string, title:string, description:string){
        this.idTicket = idTicket;
        this.email = email;
        this.name = name;
        this.title = title;
        this.description = description;
    }

}
