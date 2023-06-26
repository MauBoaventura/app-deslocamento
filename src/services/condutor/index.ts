/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import {
  IPageCondutorDTO,
  ICondutorProps,
  ICondutorSaveBody,
  ICondutorDTO,
  ICondutorUpdateBody,
} from "./types";

import { axiosApi as deslocamentoApi } from "../index";

const baseUrlCondutor = "/Condutor";

export class CondutorService {
  static async getAll(): Promise<AxiosResponse<ICondutorDTO[]>> {
    const url = baseUrlCondutor;
    return deslocamentoApi.get(url);
  }
  static async getById(
    props: ICondutorProps
  ): Promise<AxiosResponse<ICondutorDTO>> {
    const url = `${baseUrlCondutor}/${props.id}`;
    return deslocamentoApi.get(url);
  }
  static async save(data: ICondutorSaveBody): Promise<AxiosResponse<number>> {
    const url = baseUrlCondutor;
    return deslocamentoApi.post(url, data);
  }
  static async update(
    props: ICondutorProps,
    data: ICondutorUpdateBody
  ): Promise<AxiosResponse<ICondutorDTO>> {
    const url = `${baseUrlCondutor}/${props.id}`;
    return deslocamentoApi.put(url, data);
  }
  static async delete(
    props: ICondutorProps
  ): Promise<AxiosResponse<ICondutorProps>> {
    const url = `${baseUrlCondutor}/${props.id}`;
    return deslocamentoApi.delete(url, { data: { ...props}});
  }
}
