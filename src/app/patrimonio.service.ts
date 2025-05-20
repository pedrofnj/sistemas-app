import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Patrimonio} from './pages/patrimonio/Patrimonio';
import {HttpClient} from '@angular/common/http';
import {Setores} from "./pages/patrimonio/Setores";
import {Status} from "./pages/patrimonio/Status";

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  private apiUrl = 'http://localhost:8080/patrimonio';

  constructor(private http: HttpClient) {
  }

  salvar(patrimonio: Patrimonio): Observable<Patrimonio> {
    return this.http.post<Patrimonio>(`${this.apiUrl}/salvar`, patrimonio);
  }

  listarPatrimonio(): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Patrimonio> {
    return this.http.get<Patrimonio>(`${this.apiUrl}/byId/${id}`);
  }

  getSetorAll(): Observable<Setores[]> {
    return this.http.get<Setores[]>(`${this.apiUrl}/setores`);
  }

  getStatusAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}/status`);
  }

}
