import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})

export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(public ofertasService:OfertasService) { 
   
  }

  ngOnInit() {

    

    this.ofertasService.getOfertasPorCategoria('restaurante').then((ofertas:Oferta[])=>{
      //console.log(ofertas);
       this.ofertas = ofertas;
    })
  }

}
