import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Patrimonio } from "../Patrimonio";
import { PatrimonioService } from "../../../patrimonio.service";
import { Setores } from "../Setores";

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

  situacoes: { value: string, viewValue: string }[] = [
    { value: 'Ativo', viewValue: 'Ativo' },
    { value: 'Em Manutenção', viewValue: 'Em Manutenção' },
  ];

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

            // Garante que o idSetor seja setado com base no objeto recebido
            this.getSetores(() => {
              if (response.setores) {
                this.patrimonio.idSetor = response.setores.id;
              }
            });
          },
          error => {
            this.patrimonio = new Patrimonio();
            this.getSetores();
          }
        );
      } else {
        this.getSetores();
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
