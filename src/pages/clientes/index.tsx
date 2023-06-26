import Layout from 'components/molecules/Layout'
import { ReactElement } from 'react'
import ClienteTemplate from 'templates/ClienteTemplate'

const Cliente = () => {
  return <ClienteTemplate />
}

export default Cliente

Cliente.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true}>{page}</Layout>
    </>
  )
}
