/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

const axiosApi  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CEP_URL,

  headers: {
    'Content-Type': 'application/json'
  }
})

export class CEPService {
  static async getById(
    cep: string
  ): Promise<AxiosResponse<any>> {
    const url = `/${cep}/json`;
    return axiosApi.get(url);
  }}
