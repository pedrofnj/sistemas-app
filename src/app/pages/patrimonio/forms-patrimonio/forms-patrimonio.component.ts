import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from '@angular/router';
import {Patrimonio} from "../Patrimonio";
import {PatrimonioService} from "../../../patrimonio.service";

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

  patrimonio: Patrimonio;

  situacoes: { value: string, viewValue: string }[] = [
    {value: 'Ativo', viewValue: 'Ativo'},
    {value: 'Em Manutenção', viewValue: 'Em Manutenção'},
  ];

  constructor(
    private patrimonioService: PatrimonioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.patrimonio = new Patrimonio();
  }

  ngOnInit(): void {
    this.patrimonio.dataCadastro = new Date().toISOString().split('T')[0];
    console.log('Data de cadastro:', this.patrimonio.dataCadastro);

    this.activatedRoute.params.subscribe(urlParams => {
      let id = urlParams['id'];
      if (id) {
        this.patrimonioService.getById(id).subscribe(
          response => {
            this.patrimonio = response;
            this.patrimonio.situacao = response.situacao;
          },
          errorResponse => this.patrimonio = new Patrimonio()
        );
      }
    });
  }

  onSubmit() {
    console.log('Salvando patrimônio:', this.patrimonio);
    this.patrimonioService.salvar(this.patrimonio).subscribe(
      patrimonio => {
        console.log('Patrimônio salvo com sucesso!');
        this.patrimonio = new Patrimonio();
      },
      error => {
        console.error('Erro ao salvar patrimônio: ', error);
      }
    );
  }
}
