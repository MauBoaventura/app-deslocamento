import { IPageResult } from "src/types/pagination";

export type IPageCondutorDTO = IPageResult<ICondutorDTO>;

export interface ICondutorDTO {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ICondutorProps {
  id: number;
}

export interface ICondutorSaveBody {
  nome?: string;
  numeroHabilitacao?: string;
  categoriaHabilitacao?: string;
  vencimentoHabilitacao?: string;
}

export interface ICondutorUpdateBody {
  id?: number;
  categoriaHabilitacao?: string;
  vencimentoHabilitacao?: string;
}
