/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthContext } from 'context/AuthContext'
import { useContext } from 'react'

function useAuth(): any {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { useAuth }
