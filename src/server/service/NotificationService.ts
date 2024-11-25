import {MessagePayloadWithTextRequired} from "@server/gateways/SlackNotificationSender";
import {KakaoMessagePayload, KakaoMessageResponse} from "@server/gateways/KakaoNotificationSender";


export interface SlackNotification {
    sendSlackMessage(messagePayload: MessagePayloadWithTextRequired): Promise<void>;
    
}
export interface KakaoNotification{
    sendKakaoMessage(messagePayload:KakaoMessagePayload):Promise<KakaoMessageResponse>
}

export interface NotificationSenders{
    slack?:SlackNotification;
    kakao?:KakaoNotification;
}

export class NotificationService {
    constructor(private readonly sender: NotificationSenders,
    ) {}

    async notifySlack( messagePayload : MessagePayloadWithTextRequired) {
        return this.sender.slack?.sendSlackMessage(messagePayload);
    }

    async notifyKakao(messagePayload:KakaoMessagePayload):Promise<KakaoMessageResponse|undefined>{
        return this.sender.kakao?.sendKakaoMessage(messagePayload);
    }
}


