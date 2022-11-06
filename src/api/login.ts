export {}
// import { setUser } from '@app/services/token.service'
// import { LoginForm } from '@app/types/auth'
// import { aiffAPI } from '@app/utils/aiffAPI'
// import { serverAPI } from '../utils/constants'

// type User = {
//   accessToken: string
//   refreshToken: string
//   email: string
// }
// export const login = async ({ email, password }: LoginForm): Promise<User> => {
  // const loginResp = await aiffAPI
  //   .post(serverAPI.AUTH_LOGIN, {
  //     email,
  //     password,
  //   })
  //   .catch(err => {
  //     return console.log('login err', err)
  //   })

  // if (loginResp?.data?.accessToken) {
  //   setUser(loginResp.data)
  // }
  // return loginResp?.data
// }
