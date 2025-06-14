import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface Responsavel {
  id?: number;
  nome?: string;
  cpf?: string;
  telefone?: string;
}

@Component({
  selector: 'app-responsavel-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './responsavel-form.component.html',
  styleUrl: './responsavel-form.component.css'
})
export class ResponsavelFormComponent implements OnInit {
  responsavel: Responsavel = {};
  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' | '' = '';

  ngOnInit(): void {
    // Aqui você pode carregar dados se for edição futuramente
  }

  onSubmit() {
    this.mensagem = this.responsavel.id
      ? 'Responsável editado com sucesso!'
      : 'Responsável cadastrado com sucesso!';
    this.tipoMensagem = 'success';

    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 2000);
  }
}
