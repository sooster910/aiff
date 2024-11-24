import {OrderService} from "@server/service/orderService";
import {OrderDTO} from "@server/types/order";
import {NextApiRequest, NextApiResponse} from "next";
import {WebClient} from "@slack/web-api";
import {
    BIZ_PLUS_CLIENT_ID, BIZ_PLUS_SENDER_ID,
    BIZ_PLUSH_CLIENT_PW, BIZ_SENDER_KEY,
    bzPlusURL,
    SLACK_API_TOKEN
} from "@app/utils/constants";
import {SlackNotificationSender} from "@server/gateways/SlackNotificationSender";
import {
    NotificationService,
} from "@server/service/NotificationService";
import {KakaoNotificationSender} from "@server/gateways/KakaoNotificationSender";
import {TossPaymentError} from "@server/errors/TossPaymentError";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log("Req", req)
    console.log("res",res)

    if(!isValidOrderDTO(req.query)){
        throw new Error(`OrderDTO 유효성 검증 실패`)
    }

    const { orderId, amount, phone, paymentKey, qty, customerName } =
        req.query

    const order = {
        orderId:String(orderId),
        amount:Number(amount),
        phone:String(phone),
        paymentKey:String(paymentKey),
        qty:Number(qty),
        customerName:String(customerName),
    }

    const context = createContext();
    const orderService = new OrderService(context);


    try{
        //토스결제가 완료되면 무조건 리다이렉트를 하고 나머지 sms, slack 전송에서 에러 난 경우는 slack으로 에러를 보내져야 한다.
        const approveResult = await orderService.processOrderApproval(order);
        res.redirect(`/success?orderId=${orderId}&orderName=${approveResult?.orderName}&requestedAt=${approveResult?.requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${approveResult?.balanceAmount}&customerName=${customerName}&qty=${qty}`)

    }catch(error){
        if(error instanceof TossPaymentError){
            res.redirect(
                `/fail?code=${error?.code}&message=${error.message}`
            );
        }
    }
    res.status(200).json({ created:true });
}



export interface AppContext{
    slackNotificationService:NotificationService
    kakaoNotificationService:NotificationService
}
const createContext = ():AppContext=>{

    const slackNotificationSender=new SlackNotificationSender(new WebClient(SLACK_API_TOKEN))
    const slackNotificationService = new NotificationService({slack:slackNotificationSender})
    const kakaoNotificationSender = new KakaoNotificationSender(bzPlusURL, BIZ_PLUS_CLIENT_ID,BIZ_PLUSH_CLIENT_PW, BIZ_PLUS_SENDER_ID,BIZ_SENDER_KEY)
    const kakaoNotificationService = new NotificationService({kakao: kakaoNotificationSender})

    return {
        slackNotificationService,
        kakaoNotificationService
    }

}

const isValidOrderDTO =(param:Partial<OrderDTO>): param is OrderDTO =>{
    return !!(param.orderId && param.amount && param.phone && param.qty && param.customerName && param.paymentKey)
}