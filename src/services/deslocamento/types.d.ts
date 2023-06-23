import { IPageResult } from "src/types/pagination";

export type IPageDeslocamentoDTO = IPageResult<IDeslocamentoDTO>;

export interface IDeslocamentoDTO {
  id: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface IDeslocamentoProps {
  id: number;
}

export interface IDeslocamentoIniciarBody {
  numeroDocumento?: string;
  tipoDocumento?: string;
  nome?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface IDeslocamentoEncerrarBody {
  id: number;
  kmFinal: number;
  fimDeslocamento: string;
  observacao: string;
}

export interface IDeslocamentoUpdateBody {
  id?: number;
  nome?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}
