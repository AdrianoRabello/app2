import { CarrinhoService } from './../carrinho.service';
import { OfertasService } from './../ofertas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import { Oferta } from '../shared/oferta.model';
import { Observable, observable, Observer, Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})


export class OfertaComponent implements OnInit,OnDestroy {

  public oferta: Oferta;
  
  private tempoObservableSubscription:Subscription;
  private meuObservavleTesteSubscription:Subscription;
 
  constructor( private route: ActivatedRoute,public ofertaService: OfertasService,private carrinhoService:CarrinhoService) { }

    ngOnInit() {

      //console.log("metodo do carrnho service ",this.carrinhoService.exibirItens());

      this.route.params.subscribe((parametros:Params)=>{
        
        this.ofertaService.getOferta(parametros.id).then((oferta:Oferta)=>{ 
          this.oferta = oferta; 
          //console.log("console log de this.oferta",this.oferta)
        });  
        
      })

      
      //console.log(id);

      //pegando o id com subscribe. Com subscribe odemos recuperar o objeto em si com propriedade e valor, com snapshot retorna apenas os valores
      
      /*this.route.params.subscribe((parametro:any)=>{
                                                    console.log(parametro)},
                                                    (erro:any)=>{console.log(erro),
                                                    ()=>console.log("completou a tarefa")
                                                   });*/


      

      //código para teste do observable
      /*let tempo =  interval(1000);

      this.tempoObservableSubscription = tempo.subscribe((intervalo:number)=>{ console.log(Number)})
                                                          
      //observavel
      let meuObservableTeste = Observable.create((observer:Observer<string>)=>{
        observer.next('primeiro evento da stream');
        observer.next("teste");
        observer.error("algum error foi encontrado");
      });


      //observador
      this.meuObservavleTesteSubscription = meuObservableTeste.subscribe((resultado:string)=>{console.log(resultado)},(error:any)=>{console.log(error)});*/

    }


    ngOnDestroy(){
      /*this.meuObservavleTesteSubscription.unsubscribe();
      this.tempoObservableSubscription.unsubscribe();*/
    }

    adicionarItemCarrinho():void{
      
      this.carrinhoService.incluirItem(this.oferta);
      //console.log(this.carrinhoService.exibirItens());
    }

}