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

export interface IDeslocamentoSaveBody {
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface IDeslocamentoUpdateBody {
  id: number;
  kmFinal: number;
  fimDeslocamento: string;
  observacao: string;
}
