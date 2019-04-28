import { Component } from '@angular/core';
import { ServicoService } from "../services/servico.service";
import { Estacionamento } from '../estacionamento';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private estService:ServicoService){ }

  ngOnInit(){
    this.estService.ticket='';
  }
}
