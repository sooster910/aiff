import {
  getLocalRefreshToken,
  updateNewAccessToken,
} from '@app/services/token.service'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { COOKIES, NEXT_PUBLIC_BACKEND_BASE_URL, NEXT_PUBLIC_FRONTEND_BASE_URL, NEXT_PUBLIC_TOSS_SECRET_KEY, serverAPI } from './constants'
import { Buffer } from 'buffer';
const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`)
  return response
}
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`)
  const originalConfig = error.config

  if (error.response) {
    // ANCHOR : access token expired
    if (error.response.status === 403) {
      try {
        const resp = await aiffAPI.post(serverAPI.AUTH_TOKEN, {
          refreshToken: getLocalRefreshToken(),
        })
        console.log('responseError', resp)
        const { accessToken } = resp.data
        console.log('new AccessToken', accessToken)
        updateNewAccessToken(accessToken)
      } catch (err) {
        console.log(' response error ', err)
      }
    }
  }

  return Promise.reject(error)
}
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`)
  const token = localStorage.getItem('persist')

  if (token && config.headers) {
    config.headers['x-auth-token'] = token
  }

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const TossSecretToBase64 =  Buffer.from(`${NEXT_PUBLIC_TOSS_SECRET_KEY}:`).toString('base64')

export const aiffBackendAPI = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json',
    'Authorization': `Basic ${TossSecretToBase64}`,
    withCredentials: true,
  },
})
export const aiffAPI = axios.create({
  baseURL:`${NEXT_PUBLIC_FRONTEND_BASE_URL}/proxy/api`,
  headers: { 'Content-Type': 'application/json', 
    'Authorization': `Basic ${TossSecretToBase64}`,
    'Access-Control-Allow-Origin': 'https://www.aiff.co.kr',
    withCredentials: true,
       },
})

export const aiffAPISSR = () => axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
    withCredentials: true,
  headers: { 'Content-Type': 'application/json', 
    'Authorization': `Basic ${TossSecretToBase64}`
            
       },
  })


aiffBackendAPI.interceptors.request.use(request=>{
  console.log("RequestURL", request.baseURL + request.url)
  return request;
})
  
aiffAPI.interceptors.request.use(onRequest, onRequestError)
aiffAPI.interceptors.response.use(onResponse, onResponseError)

