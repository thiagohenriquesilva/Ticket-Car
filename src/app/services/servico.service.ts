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
  pagamentoCollection: AngularFirestoreCollection<Estacionamento>;

  constructor(private afs: AngularFirestore) {
    this.pagamentoCollection = this.afs.collection<Estacionamento>('Tickets');
    this.recibos = this.pagamentoCollection.snapshotChanges()
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
  
  //getRetornaPagamento() {
  //  return this.recibos;
 // }

  addPagamento(estacionamento: Estacionamento): Promise<DocumentReference>{
    return this.pagamentoCollection.add(estacionamento);
  }

  getPagamentos(): Observable<Estacionamento[]>{
    return this.recibos;
  }

  getPagamento(id: string): Observable<Estacionamento>{
    return this.pagamentoCollection.doc<Estacionamento>(id).valueChanges()
    .pipe(
      take(1),
      map(estacionamento => {
        estacionamento.ticket = id;
        return estacionamento;
      })
    );
  }
}

