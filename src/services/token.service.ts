export const getLocalRefreshToken = ():string => {
  const user = JSON.parse(localStorage.getItem('user') || '')
  return user?.refreshToken
}

export const getLocalAccessToken = ():string => {
  const user = JSON.parse(localStorage.getItem('user') || '')
  return user?.accessToken
}

export const updateNewAccessToken = (token: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '')
  user.accessToken = token
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user') || '')
}

export const setUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user))
}
