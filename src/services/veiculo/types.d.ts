import { IPageResult } from "src/types/pagination";

export type IPageVeiculoDTO = IPageResult<IVeiculoDTO>;

export interface IVeiculoDTO {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IVeiculoProps {
  id: number;
}

export interface IVeiculoSaveBody {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IVeiculoUpdateBody {
  id: number;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}
