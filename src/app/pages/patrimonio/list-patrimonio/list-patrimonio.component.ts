import { Component, OnInit } from '@angular/core';
import { Patrimonio } from '../Patrimonio';
import { PatrimonioService } from '../../../patrimonio.service';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-patrimonio',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './list-patrimonio.component.html',
  styleUrls: ['./list-patrimonio.component.css']
})
export class ListPatrimonioComponent implements OnInit {

  patrimonios: Patrimonio[] = [];

  constructor(private patrimonioService: PatrimonioService, private router: Router) {}

  ngOnInit() {
    this.patrimonioService.listarPatrimonio().subscribe(patrimonio => {
      this.patrimonios = patrimonio;
    });
  }

  editar(id: any) {
    console.log(id);
    this.router.navigate(['/forms-patrimonio', id]);
  }
}
