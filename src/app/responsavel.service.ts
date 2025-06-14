import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsavel } from './pages/responsavel/Responsavel';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  private apiUrl = 'http://localhost:8080/responsavel';

  constructor(private http: HttpClient) { }

  salvar(responsavel: Responsavel): Observable<Responsavel> {
    return this.http.post<Responsavel>(`${this.apiUrl}/salvar`, responsavel);
  }

  listarResponsaveis(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Responsavel> {
    return this.http.get<Responsavel>(`${this.apiUrl}/byId/${id}`);
  }
}
