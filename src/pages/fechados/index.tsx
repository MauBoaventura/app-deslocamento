import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import DeslocamentoFechadoTemplate from 'templates/DeslocamentoFechadoTemplate'

const DeslocamentoFechado = () => {
  return <DeslocamentoFechadoTemplate />
}

export default DeslocamentoFechado

DeslocamentoFechado.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
