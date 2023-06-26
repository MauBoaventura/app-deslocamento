import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import CondutorTemplate from 'templates/CondutorTemplate'

const Condutor = () => {
  return <CondutorTemplate />
}

export default Condutor

Condutor.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
