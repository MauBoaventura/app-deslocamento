/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { IPageBeneficiarioDTO, IBeneficiarioProps } from './types'

import objectToParams from 'utils/ObjectToParams'

import { axiosApi as deslocamentoApi } from '../contrato/index'

const baseUrlContratos = '/segurados'

export class Beneficiario {
  static async get(props?: IBeneficiarioProps): Promise<AxiosResponse<IPageBeneficiarioDTO>> {
    const params = objectToParams(props)
    const url = props ? `${baseUrlContratos}?${params}` : baseUrlContratos
    return deslocamentoApi.get(url)
  }
}
