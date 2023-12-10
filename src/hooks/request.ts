import { Axios, AxiosError, AxiosResponse } from "axios";

type BaseRequest<T,V> = (params?:T) => Promise<AxiosResponse<V>>

type SuccessResponse<V> = {
    code:"success",
    data:V
}

type ErrorResponse<E = AxiosError>={
    code:"error",
    error:E
}

// type BaseResponse<V,E>=Promise<SuccessResponse<V>|Promise<ErrorResponse<E>>>


// export const requestHandler = <T,V,E=AxiosError>(request:BaseRequest<T,V> ) => async(params?:T):BaseResponse<V,E>=>{
//     try{
//         const response = await request(params);
//         return{
//             code:"success",
//             data:response.data
//         }}catch(error){
//             return {
//                 code:"error",
//                 error
//             }
//         }
//     }




