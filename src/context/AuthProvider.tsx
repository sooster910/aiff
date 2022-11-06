/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

type AuthContextState = {
  user?: {
    name: string
  }
  //   persist?: string
  login?: (user: any) => void
  logout?: () => void
}
export const AuthContext = createContext<AuthContextState | null>(null)

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  //   const [persist, setPersist] = useState<string>(() =>
  //     JSON.parse(localStorage.getItem('persist') || '{}')
  //   )
  const login = (user: any) => {
    setUser(user)
  }
  const logout = () => {
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
