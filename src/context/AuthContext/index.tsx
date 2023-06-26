/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import useStorage from 'hooks/storage/useStorage'

import React, { createContext, useEffect, useState } from 'react'
// import { getProfile } from 'src/services/managment/user'

import { localStorageToken, localStorageUserData } from 'utils/constants'

export const AuthContext = createContext({} as any)

type StateProviderProps = {
  children?: React.ReactNode
}

const AuthProvider = ({ children }: StateProviderProps) => {
  const [data, setData, removeData] = useStorage(localStorageUserData)
  const [dataUser, setDataUser] = useState()
  const [dataToken, setDataToken, removeDataToken] = useStorage(localStorageToken)

  function logout() {
    removeDataToken()

    removeData()
  }

  useEffect(() => {
    if (data?.name === undefined || data?.email === undefined || data?.imageUrl === undefined) {
      // getProfile()
      //   .then((response) => {
      //     setDataUser({
      //       ...data,
      //       ['name']: response.name,
      //       ['email']: response.email,
      //       ['imageUrl']: response.imageUrl
      //     })
      //   })
      //   .catch((error) => {
      //     // console.log(error)
      //   })
    } else {
      setDataUser(data)
    }
  }, [])

  useEffect(() => {
    setData(dataUser)
  }, [dataUser])

  return (
    <AuthContext.Provider
      value={{
        data,

        setData,

        removeData,

        dataToken,

        setDataToken,

        removeDataToken,

        logout,

        dataUser,

        setDataUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
