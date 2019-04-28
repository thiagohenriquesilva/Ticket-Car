import { Injectable } from '@angular/core';
import { Estacionamento } from '../estacionamento';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  recibos: Array<Estacionamento> = [];
  ticket: string;

  constructor() { }

  pagamentoConfirmado(value){
    this.recibos.push({
      ticket: value.ticket,
      entrada: value.entrada,
      saida: value.saida
    });
  }
  
  getRetornaPagamento() {
    return this.recibos;
  }
}

