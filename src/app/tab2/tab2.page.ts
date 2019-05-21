import { Component } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { from, Observable } from 'rxjs';
import { Estacionamento } from '../estacionamento';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items:Observable<Estacionamento[]>;

  constructor(public estService: ServicoService) {}

  ngOnInit(){
    this.items = this.estService.getPagamentos();
    console.log(this.items);
    this.items.subscribe(
      (r) => console.log(r[0]),
      (err) => console.log(err)
    )
  }

  calculaValor(value)
 {
    let e = value.entrada.split(':')
    let s = value.saida.split(':')

    var horaEntrada = parseFloat(e[0]);
    var minEntrada = parseFloat(e[1]);
    var horaSaida = parseFloat(s[0]);
    var minSaida = parseFloat(s[1]);

    var result = 0.0;
 
    if ( horaEntrada > horaSaida ) {
      if ( minEntrada > minSaida ) {
        result += (( 23.00 - horaEntrada + horaSaida ) * 60.00 ) + ( 60.00 - minEntrada + minSaida );
      } else {
        result += (( 24.00 - horaEntrada + horaSaida ) * 60.00 ) + ( minSaida - minEntrada );
       }
      } else {
        if ( horaEntrada === horaSaida) {
          if ( minEntrada > minSaida ) {
            result += ( 23 * 60.00 ) + ( 60.00 - minEntrada + minSaida );
          } else {
            result += (( horaSaida - horaEntrada ) * 60.00 ) + ( minSaida - minEntrada );
          }
        } else {
        result += (( horaSaida - horaEntrada - 1 ) * 60.00 ) + ( 60.00 - minEntrada + minSaida );
        }
        result = Math.round( result / 50.00 * 10.00 );
      }
      return  result;
  }
}
