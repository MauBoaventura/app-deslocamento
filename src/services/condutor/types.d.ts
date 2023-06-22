import { IPageResult } from 'src/types/pagination'

export type IPageBeneficiarioDTO = IPageResult<IBeneficiarioDTO>

export interface IBeneficiarioDTO {
  codigoAns: string
  codigoCco: string
  codigoCns: string
  contatos: IContatoDTO[]
  cpfCnpj: string
  dadoBancario: IDadoBancarioDTO
  // campo de adaptação
  cpf?: string
  dataFim: string
  dataInicio: string
  dataNascimento: string
  enderecos: IEnderecoDTO[]
  id: string
  idCoberturaApi: number
  idConfigCarenciaApi: number
  idContrato: string
  idPessoaApi: string
  idProduto: number
  idTabelaCoparticipacaoApi: number
  idTabelaPrecosApi: number
  idTitular: string
  idade: number
  nome: string
  numeroCartao: string
  relacaoDependencia: string
  rg: string
  sexo: EnumSexo
  situacao: 'CADASTRADO' | 'EM_VIGENCIA' | 'SUSPENSO' | 'CANCELADO'
  situacaoRh: 'SERVIDOR_ATIVO' | 'PENSIONISTA' | 'APOSENTADO'
  tipoSegurado: 'TITULAR' | 'DEPENDENTE'
}

export interface IBeneficiarioProps extends ISortPage {
  cpf?: string
  codigoAns?: string
  numeroPlano?: string
  cpfNumeroCartao?: string
}
