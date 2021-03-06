import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ServicoService } from '../services/servico.service';
import { Estacionamento } from '../estacionamento';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
  estacionamento: Estacionamento = {
    ticket: '',
    entrada: '',
    saida: ''
  };
  valor: Number;

  constructor(
    private activateRoute: ActivatedRoute,
    private ticketService: ServicoService,
    private router: Router,
    private estService: ServicoService) { }

  ngOnInit() {
    
    //this.estacionamento = new Estacionamento();
    this.activateRoute.params.subscribe(
      data => {
        this.estacionamento.ticket = data.id;
      }
    );
    this.valor = 0.0;
    this.estacionamento.entrada = '';
    this.estacionamento.saida = '';
  }

  calculaTempo() {
  var horaEntrada = parseFloat(this.estacionamento.entrada.slice(11, 13));
  var minEntrada = parseFloat(this.estacionamento.entrada.slice(14, 16));
  var horaSaida = parseFloat(this.estacionamento.saida.slice(11, 13));
  var minSaida = parseFloat(this.estacionamento.saida.slice(14, 16));
  var result = 0.0;

  if ( this.estacionamento.entrada !== '' && this.estacionamento.saida !=='' ){
    if ( horaEntrada > horaSaida ) {
        if ( minEntrada > minSaida ) {
          result += (( 23.00 - horaEntrada + horaSaida ) * 60.00 ) + ( 60.00 - minEntrada + minSaida );
        } else {
          result += (( 24.00 - horaEntrada + horaSaida ) * 60.00 ) + ( minSaida - minEntrada);
        }
    } else
      if ( horaEntrada === horaSaida) {
        if ( minEntrada > minSaida ) {
          result += ( 23 * 60.00 ) + ( 60.00 - minEntrada + minSaida );
        } else {
          result += (( horaSaida - horaEntrada ) * 60.00 ) + ( minSaida - minEntrada);
        }
      } else {
        result += (( horaSaida - horaEntrada - 1 ) * 60.00 ) + ( 60.00 - minEntrada + minSaida );
      }
      this.valor = Math.round( result / 50.00 * 10.00 );
      this.estacionamento.entrada = (horaEntrada + ":" + (minEntrada < 10 ? '0' + minEntrada : minEntrada)).toString();
      this.estacionamento.saida = ( horaSaida + ":" + ( minSaida < 10 ? '0' + minSaida : minSaida )).toString();
  } else
    alert ( 'Falta valores a serem definidos!' );
  }
  okPag(value){

    var horaEntrada = parseInt(this.estacionamento.entrada.slice(11,13));
    var horaSaida = parseFloat(this.estacionamento.saida.slice(11,13));
    var minEntada =  parseFloat(this.estacionamento.entrada.slice(14,16));
    var minSaida = parseFloat(this.estacionamento.saida.slice(14,16));
    this.estacionamento.entrada =(horaEntrada + ':' + (minEntada<10?'0'+minEntada:minEntada)).toString();
    this.estacionamento.saida =(horaSaida + ':' + (minSaida<10?'0' + minSaida:minSaida)).toString();  
    this.estService.addPagamento(this.estacionamento);
    this.estService.ticket='';

    //this.estService.addPagamento(value);
    //this.estacionamento = null;
    //this.estService.ticket = '';
  }

  addPagamento(){
    this.ticketService.addPagamento(this.estacionamento).then(
      () => {
        this.router.navigateByUrl('/');
      }
    )
  }
}
