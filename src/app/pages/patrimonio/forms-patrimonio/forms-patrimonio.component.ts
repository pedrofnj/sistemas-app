import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Patrimonio } from "../Patrimonio";
import { PatrimonioService } from "../../../patrimonio.service";
import { Setores } from "../Setores";
import {Status} from "../Status";

@Component({
  selector: 'app-forms-patrimonio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './forms-patrimonio.component.html',
  styleUrls: ['./forms-patrimonio.component.css']
})
export class FormsPatrimonioComponent implements OnInit {

  patrimonio: Patrimonio = new Patrimonio();
  setores: Setores[] = [];
  patrimonioStatus: Status[] = [];

  constructor(
    private patrimonioService: PatrimonioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patrimonio.dataCadastro = new Date().toISOString().split('T')[0];

    this.activatedRoute.params.subscribe(urlParams => {
      const id = urlParams['id'];
      if (id) {
        this.patrimonioService.getById(id).subscribe(
          (response: Patrimonio) => {
            this.patrimonio = response;

            // Carregar setores e status
            this.getSetores(() => {
              if (response.setores) {
                this.patrimonio.idSetor = response.setores.id;
              }
            });

            this.getStatus(() => {
              if (response.patrimonioStatus) {
                this.patrimonio.idStatus = response.patrimonioStatus.id;
              }
            });
          },
          error => {
            console.error('Erro ao carregar patrimônio:', error);
            this.patrimonio = new Patrimonio();
            this.getSetores();
            this.getStatus();
          }
        );
      } else {
        this.getSetores();
        this.getStatus();
      }
    });
  }

  getSetores(callback?: () => void) {
    this.patrimonioService.getSetorAll().subscribe(
      (response: Setores[]) => {
        this.setores = response;
        if (callback) callback();
      },
      error => {
        console.error('Erro ao carregar setores:', error);
      }
    );
  }

  getStatus(callback?: () => void) {
    this.patrimonioService.getStatusAll().subscribe(
      (response: Status[]) => {
        console.log('Status carregados:', response);
        this.patrimonioStatus = response;
        if (callback) callback();
      },
      error => {
        console.error('Erro ao carregar status:', error);
      }
    );
  }

  onSubmit() {
    console.log('Enviando patrimônio:', this.patrimonio);

    this.patrimonioService.salvar(this.patrimonio).subscribe({
      next: () => {
        console.log('Patrimônio salvo com sucesso!');
        this.patrimonio = new Patrimonio();
      },
      error: err => {
        console.error('Erro ao salvar patrimônio:', err);
      }
    });
  }
}
