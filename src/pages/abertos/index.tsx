import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import DeslocamentoAbertoTemplate from 'templates/DeslocamentoAbertoTemplate'

const DeslocamentoAberto = () => {
  return <DeslocamentoAbertoTemplate />
}

export default DeslocamentoAberto

DeslocamentoAberto.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
