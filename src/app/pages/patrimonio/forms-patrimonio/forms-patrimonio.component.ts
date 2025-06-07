import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import {Patrimonio} from "../Patrimonio";
import {PatrimonioService} from "../../../patrimonio.service";
import {Setores} from "../Setores";
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
  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' | '' = '';

  constructor(
    private patrimonioService: PatrimonioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  onSubmit() {
    const isNovo = !this.patrimonio.codigo;
    this.patrimonioService.salvar(this.patrimonio).subscribe({
      next: (responde: Patrimonio) => {
        this.patrimonio = responde;

        // Corrige os campos para os selects funcionarem após salvar
        this.patrimonio.idSetor = responde.setores ? responde.setores.id : null;
        this.patrimonio.idStatus = responde.patrimonioStatus ? responde.patrimonioStatus.id : null;

        this.mensagem = isNovo ? 'Patrimônio cadastrado com sucesso!' : 'Patrimônio editado com sucesso!';
        this.tipoMensagem = 'success';

        if (isNovo && this.patrimonio.codigo) {
          setTimeout(() => {
            this.mensagem = '';
            this.tipoMensagem = '';
            this.router.navigate(['/forms-patrimonio', this.patrimonio.codigo], {state: {novoCadastro: true}});
          }, 2000);
        } else {
          setTimeout(() => {
            this.mensagem = '';
            this.tipoMensagem = '';
          }, 2000);
        }
      },
      error: err => {
        // Tenta pegar a mensagem do backend, se existir
        this.mensagem = err?.error?.message || 'Erro ao salvar patrimônio!';
        this.tipoMensagem = 'danger';
        setTimeout(() => {
          this.mensagem = '';
          this.tipoMensagem = '';
        }, 2000);
        console.error('Erro ao salvar patrimônio:', err);
      }
    });
  }

  ngOnInit(): void {
    this.patrimonio.dataCadastro = new Date().toISOString().split('T')[0];

    this.activatedRoute.params.subscribe(urlParams => {
      const codigo = urlParams['codigo'];
      if (codigo) {
        this.patrimonioService.getByCodigo(codigo).subscribe(
          (response: Patrimonio) => {
            this.patrimonio = response;

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

            // Se veio de um cadastro, mostrar mensagem de edição
            if (history.state && history.state.novoCadastro) {
              this.mensagem = 'Patrimônio editado com sucesso!';
              this.tipoMensagem = 'success';
              setTimeout(() => {
                this.mensagem = '';
                this.tipoMensagem = '';
              }, 2000);
            }
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
        this.patrimonioStatus = response;
        if (callback) callback();
      },
      error => {
        console.error('Erro ao carregar status:', error);
      }
    );
  }
}
