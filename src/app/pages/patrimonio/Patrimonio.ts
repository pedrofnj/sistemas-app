import {Setores} from "./Setores";
import {Status} from "./Status";

export class Patrimonio {
  id?: number;
  codigo?: number;
  nome?: string;
  descricao?: string;
  modelo?: string
  localizacao?: string;
  dataAquisicao?: string;
  dataCadastro?: string;
  numeroSerie?: string;
  valor?: string;
  situacao?: string;
  idSetor?: number | null;
  idStatus?: number | null;
  setores?: Setores; // usado para carregar dados na edição
  patrimonioStatus?: Status; // usado para carregar dados na edição
}
