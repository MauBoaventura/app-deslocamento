/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import {
  IClienteProps,
  IClienteSaveBody,
  IClienteDTO,
  IClienteUpdateBody,
} from "./types";

import { axiosApi as deslocamentoApi } from "../index";

const baseUrlCliente = "/Cliente";

export class ClientesService {
  static async getAll(): Promise<AxiosResponse<IClienteDTO[]>> {
    const url = baseUrlCliente;
    return deslocamentoApi.get(url);
  }
  static async getById(
    props: IClienteProps
  ): Promise<AxiosResponse<IClienteDTO>> {
    const url = `${baseUrlCliente}/${props.id}`;
    return deslocamentoApi.get(url);
  }
  static async save(
    data: IClienteSaveBody
  ): Promise<AxiosResponse<number>> {
    const url = baseUrlCliente;
    return deslocamentoApi.post(url, data);
  }
  static async update(
    props: IClienteProps,
    data: IClienteUpdateBody
  ): Promise<AxiosResponse<IClienteDTO>> {
    const url = `${baseUrlCliente}/${props.id}`;
    return deslocamentoApi.put(url, data);
  }
  static async delete(
    props: IClienteProps
  ): Promise<AxiosResponse<IClienteProps>> {
    const url = `${baseUrlCliente}/${props.id}`;
    return deslocamentoApi.delete(url, { data: { ...props}});
  }
}
