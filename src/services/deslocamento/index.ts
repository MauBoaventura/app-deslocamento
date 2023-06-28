/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import {
  IDeslocamentoProps,
  IDeslocamentoSaveBody,
  IDeslocamentoDTO,
  IDeslocamentoUpdateBody,
} from "./types";

import { axiosApi as deslocamentoApi } from "../index";

const baseUrlDeslocamento = "/Deslocamento";

export class DeslocamentoService {
  static async getAll(): Promise<AxiosResponse<IDeslocamentoDTO[]>> {
    const url = baseUrlDeslocamento;
    return deslocamentoApi.get(url);
  }
  static async getById(
    props: IDeslocamentoProps
  ): Promise<AxiosResponse<IDeslocamentoDTO>> {
    const url = `${baseUrlDeslocamento}/${props.id}`;
    return deslocamentoApi.get(url);
  }
  static async iniciarDeslocamento(
    data: IDeslocamentoSaveBody
  ): Promise<AxiosResponse<number>> {
    const url = `${baseUrlDeslocamento}/IniciarDeslocamento`;
    return deslocamentoApi.post(url, data);
  }
  static async encerrarDeslocamento(
    props: IDeslocamentoProps,
    data: IDeslocamentoUpdateBody
  ) {
    const url = `${baseUrlDeslocamento}/${props.id}/EncerrarDeslocamento`;
    return deslocamentoApi.put(url, data);
  }
  static async delete(props: IDeslocamentoProps) {
    const url = `${baseUrlDeslocamento}/${props.id}`;
    return deslocamentoApi.delete(url, { data: { ...props}});
  }
}
