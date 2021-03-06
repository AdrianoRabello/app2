import { Oferta } from 'src/app/shared/oferta.model';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public itensCarrinho: ItemCarrinho[] = [];

  

  public formulario:FormGroup = new FormGroup({

    'endereco':        new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(120)]),
    'numero':          new FormControl(null,[Validators.required, Validators.minLength(1),Validators.maxLength(20)]),   
    'complemento':     new FormControl(null),
    'formaPagamento':  new FormControl(null,[Validators.required])

  });

  public idPedidoCompra:number

  constructor(private ordemCompraService: OrdemCompraService,private carrinhoService:CarrinhoService) { }

  ngOnInit() {
    
    //console.log(this.idPedidoCompra);
    //console.log(" carrinho de itens ", this.carrinhoService.exibirItens())
    this.itensCarrinho = this.carrinhoService.exibirItens();

    //console.log(this.itensCarrinho);

  }



  public confirmarCompra(): void {

    if(this.formulario.status == "INVALID"){
     /*  console.log(this.formulario.status); */

     // para marcar os campos como touched e com isso no css tem uma classe que coloca uma borda para alterar a cor dos campos  
     this.formulario.get("endereco").markAsTouched();
     this.formulario.get("numero").markAsTouched();
     this.formulario.get("formaPagamento").markAsTouched();
   
    }else{

      if(this.carrinhoService.exibirItens().length === 0 ){
        alert("Não há itens ");
        return;
      }
   
      let pedido = new Pedido(this.formulario.value.endereco,
                              this.formulario.value.numero,
                              this.formulario.value.complemento,
                              this.formulario.value.formaPagamento,
                              this.carrinhoService.exibirItens())

     
      this.ordemCompraService.efetivarCompra(pedido).subscribe((pedido)=>{
        this.idPedidoCompra = pedido.id;        
        this.carrinhoService.removerItensCarrinho();      
       
      })
    }
    
  }

  public incluirItem(item:ItemCarrinho):void{
    //console.log("cliquei ");

    console.log(item);
    this.carrinhoService.adicionaItemCarinho(item);
  }



  public removeItem(item:ItemCarrinho):void{
    //console.log("cliquei ");

    console.log(item);
    this.carrinhoService.removeItemCarinho(item);
  }


}
