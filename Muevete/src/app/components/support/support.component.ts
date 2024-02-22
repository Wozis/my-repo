import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/class/ticket';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

  //variables ticket
  idTicket:string = '';
  email:string='';
  name:string='';
  title:string="";
  description:string="";
  ticket!:Ticket;


  /**
   * calling services
   * @param router 
   */
  constructor(private adService: AdService, private router:Router) {
    
  }

  /**
   * send ticket
   */
  sendTicket() {
    this.ticket = new Ticket(this.idTicket, this.email, this.name, this.title, this.description);
    console.log(this.ticket);
    this.adService.adTicketService(this.ticket);
    alert("Su peticion se envio correctamente, en breve recibirá un correo");
    this.router.navigate(['']);
  }

  /**
   * button status
   */
  checkFields() {
    if (this.name=="" || this.title=="" || this.description=="" || this.email=='') {
      return true;
    } else {
      return false;
    }
  }
}
