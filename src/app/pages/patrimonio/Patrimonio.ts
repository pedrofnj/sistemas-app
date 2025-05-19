import {Setores} from "./Setores";

export class Patrimonio {
  id?: number;
  codigo?: number;
  nome?: string;
  descricao?: string;
  dataAquisicao?: string;
  dataCadastro?: string;
  numeroSerie?: string;
  valor?: string;
  situacao?: string;
  idSetor?: number | null;
  setores?: Setores; // usado para carregar dados na edição
}
