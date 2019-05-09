import { Injectable } from '@angular/core';
import { Estacionamento } from '../estacionamento';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ActionSequence } from 'protractor';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  recibos: Observable<Estacionamento[]>;
  ticket: string;
  ticketCollection: AngularFirestoreCollection<Estacionamento>;

  constructor(private afs: AngularFirestore) {
    this.ticketCollection = this.afs.collection<Estacionamento>('Tickets');
    this.recibos = this.ticketCollection.snapshotChanges()
    .pipe(
      map( action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  //pagamentoConfirmado(value){
  //  this.recibos.push({
  //    ticket: value.ticket,
  //    entrada: value.entrada,
  //    saida: value.saida
  //  });
  //}
  
  getRetornaPagamento() {
    return this.recibos;
  }

  addPagamento(estacionamento: Estacionamento): Promise<DocumentReference>{
    return this.ticketCollection.add(estacionamento);
  }

  getPagamento(id: string): Observable<Estacionamento>{
    return this.ticketCollection.doc<Estacionamento>(id).valueChanges()
    .pipe(
      take(1),
      map(estacionamento => {
        estacionamento.ticket = id;
        return estacionamento;
      })
    );
  }
}

