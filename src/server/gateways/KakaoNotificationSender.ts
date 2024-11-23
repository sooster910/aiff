import { KakaoNotification } from "../service/NotificationService";
import {AddType} from "@app/types";
import axios from "axios";

export interface KakaoMessageResponse{
    messageId:string,
    to:string,
    from:string,
    status:string,
    text:string
}
//TODO:  phone-storeTempate 추가
export type templatePayload ={
    customerName:string,
    storeName:string,
    regularClassName:string,
    startDate:string,
    qty:number,
    balanceAmount:number
}



type StoreTemplatePayload = AddType<templatePayload, {phone:string}>

type Target= "customer" |"store"

export type KakaoMessagePayload = AddType<StoreTemplatePayload, {target:Target} >

//TODO : tempateCode narrow하게 개선
type BodyContent= {phone:string, content:string, templateCode:string}


export class KakaoNotificationSender implements KakaoNotification {
    
    constructor( private readonly bzPlusURL: string, 
        private readonly bzPlusClientID:string,
        private readonly bzPlusClientPW :string,
        private readonly bzPlusSenderID: string,
        private readonly bzPlusSenderKey:string
    ){}
    private templateCode= {
        customer:"A00005",
        store:"A00002"
    }
    private createTemplateForCustomer({customerName, storeName, regularClassName,startDate,qty, balanceAmount}:templatePayload){
        return`[예약 완료]
            안녕하세요  ${customerName}님, 예약이 완료되었습니다!
            
            ■ 이름 : ${customerName}
            ■ 지점명 : ${storeName}
            ■ 클래스명 :${regularClassName}
            ■ 클래스 시작 날짜 : ${startDate}
            ■ 인원 : ${qty}
            ■ 결제금액 : ${balanceAmount}`
    }

    private  createTemplateForStore({customerName, storeName,  regularClassName,startDate,qty,balanceAmount,phone }:StoreTemplatePayload){
        return `[예약 완료]

                안녕하세요 ${customerName}님의 ${storeName}예약이 완료되었습니다!
                
                ■ 이름 : ${customerName}
                ■ 지점명: ${storeName}
                ■ 클래스명:${regularClassName}
                ■ 클래스 시작 날짜: ${startDate}
                ■ 인원: ${qty}
                ■ 결제금액: ${balanceAmount}
                ■ 핸드폰번호: ${phone}
                
                예약 스케줄에 차질이 없도록 기록/체크해 주시기 바랍니다.
                예약일 전 예약자에게 오시는길/주차정보를 안내해 주시기 바랍니다.
                감사합니다.`
    }
    private createContent(contentPayload: KakaoMessagePayload){
        return ({
            customer:()=> this.createTemplateForCustomer(contentPayload),
            store: ()=>this.createTemplateForStore(contentPayload)
        })
    }

    createHeader(){
        return {
            headers:{
                "X-IB-Client-Id": this.bzPlusClientID,
                "X-IB-Client-Passwd": this.bzPlusClientPW,
                "Content-Typ": "application/json;charset=UTF-8",
                Accept: "application/json",
            }
        }
    }
    createBody({phone, content, templateCode}: BodyContent){
        return  {
            msg_type: "AL",
            msg_data: {
                senderid: this.bzPlusSenderID,
                to: `82${Number(phone)}`,
                content,
            },
            msg_attr: {
                sender_key: this.bzPlusSenderKey,
                response_method: "push",
                template_code: templateCode,
                timeout: 500,
            },
        };
    }
    async sendKakaoMessage(messagePayload: KakaoMessagePayload ): Promise<KakaoMessageResponse> {

        const baseContent = this.createContent(messagePayload)
        const content = baseContent[messagePayload.target]()

        const bodyContent = this.createBody( {templateCode:this.templateCode[messagePayload.target] , content, phone:messagePayload.phone} )
        const options = this.createHeader()

        try {
            let kakaoMessageResponse = await axios.post<KakaoMessageResponse>(this.bzPlusURL, bodyContent , options )
            return kakaoMessageResponse.data
        }catch(err){
            if(axios.isAxiosError(err)){
                const responseData = err.response?.data as KakaoMessageResponse
                throw new Error(`sendKakaoMessage 실패 : messageID: ${responseData?.messageId}, TO:${responseData?.to} status:${responseData?.status}, text:${responseData?.text}`)
            }

            throw new Error( `kakaoNotificationSender/sendKakaoMessage: unknown error:${err}`)
        }

    }
        
}