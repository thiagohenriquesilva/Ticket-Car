import { Component } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items:Array<any>;

  constructor(private estService: ServicoService) {}

  ngOnInit(){
    this.items = this.estService.getRetornaPagamento();
  }

  calculaValor(value)
 {
    var horaEntrada = parseFloat(value.entrada.slice(0,2));
    var minEntrada = parseFloat(value.entrada.slice(3,5));
    var horaSaida = parseFloat(value.saida.slice(0,2));
    var minSaida = parseFloat(value.entrada.slice(3,5));
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
