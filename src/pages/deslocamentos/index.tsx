import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import DeslocamentoTemplate from 'templates/DeslocamentoTemplate'

const Deslocamento = () => {
  return <DeslocamentoTemplate />
}

export default Deslocamento

Deslocamento.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
