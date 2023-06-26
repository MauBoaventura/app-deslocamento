import React, { ReactElement } from 'react'

import Layout from 'components/molecules/Layout'

import HomeTemplate from 'templates/HomeTemplate'

const Home = () => {
  return <HomeTemplate />
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout isLoggedIn={true} title='teste'>{page}</Layout>
    </>
  )
}

export default Home
