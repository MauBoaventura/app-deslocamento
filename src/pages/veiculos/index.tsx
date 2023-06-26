import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import VeiculoTemplate from 'templates/VeiculoTemplate'

const Veiculo = () => {
  return <VeiculoTemplate />
}

export default Veiculo

Veiculo.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
