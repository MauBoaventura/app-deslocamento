import { IPageResult } from "src/types/pagination";

export interface IClienteDTO {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface IClienteProps {
  id: number;
}

export interface IClienteSaveBody {
  numeroDocumento?: string;
  tipoDocumento?: string;
  nome?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface IClienteUpdateBody {
  id?: number;
  nome?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}
