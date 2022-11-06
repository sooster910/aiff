import { AuthContext } from '@app/context/AuthProvider'
import { useContext } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}
