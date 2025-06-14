import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResponsavelService} from "../../../responsavel.service";
import {Responsavel} from "../Responsavel";

@Component({
  selector: 'app-responsavel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsavel-list.component.html',
  styleUrl: './responsavel-list.component.css'
})
export class ResponsavelListComponent {

  responsaveis: Responsavel[] = [];
  service: ResponsavelService;
  constructor(service: ResponsavelService) {
    this.service = service;
  }

  editar(id: number) {
    // Lógica de edição será implementada depois
    console.log('Editar responsável com id:', id);
  }

  ngOnInit(): void {
    this.service.listarResponsaveis().subscribe(data => {
      this.responsaveis = data;
    });
  }

}
