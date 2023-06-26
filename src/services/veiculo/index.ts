/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import {
  IVeiculoProps,
  IVeiculoSaveBody,
  IVeiculoDTO,
  IVeiculoUpdateBody,
} from "./types";

import { axiosApi as deslocamentoApi } from "../index";

const baseUrlVeiculo = "/Veiculo";

export class VeiculosService {
  static async getAll(): Promise<AxiosResponse<IVeiculoDTO[]>> {
    const url = baseUrlVeiculo;
    return deslocamentoApi.get(url);
  }
  static async getById(
    props: IVeiculoProps
  ): Promise<AxiosResponse<IVeiculoDTO>> {
    const url = `${baseUrlVeiculo}/${props.id}`;
    return deslocamentoApi.get(url);
  }
  static async save(data: IVeiculoSaveBody): Promise<AxiosResponse<number>> {
    const url = baseUrlVeiculo;
    return deslocamentoApi.post(url, data);
  }
  static async update(
    props: IVeiculoProps,
    data: IVeiculoUpdateBody
  ): Promise<AxiosResponse<IVeiculoDTO>> {
    const url = `${baseUrlVeiculo}/${props.id}`;
    return deslocamentoApi.put(url, data);
  }
  static async delete(
    props: IVeiculoProps
  ): Promise<AxiosResponse<IVeiculoProps>> {
    const url = `${baseUrlVeiculo}/${props.id}`;
    return deslocamentoApi.delete(url, { data: { ...props}});
  }
}
