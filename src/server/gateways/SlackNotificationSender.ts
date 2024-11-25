import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {SlackNotification} from "@server/service/NotificationService";
import {WithRequired} from "@app/types";

export type MessagePayloadWithTextRequired=  WithRequired<ChatPostMessageArguments,"text" >

export class SlackNotificationSender implements SlackNotification{
    private readonly defaultOptions = {
        channel: "#order",
        icon_emoji: "slack"
    };

    constructor(private readonly slack:WebClient){}

    async sendSlackMessage(messagePayload: MessagePayloadWithTextRequired) {
        try {
            const response = await this.slack.chat.postMessage({...this.defaultOptions, ...messagePayload})
            if(!response.ok)
                throw new Error(`slack 메시지 전송 실패 :Slack API error : ${response.error || '알 수 없는 에러'}`)

        }catch (err){
            if( err instanceof Error){
                if ((err as any).code === 'ECONNREFUSED') {
                    // 서버 연결 실패시 재시도 로직 추가
                    console.log('서버 연결 실패. 3초 후 재시도합니다.');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await this.slack.chat.postMessage({...this.defaultOptions, ...messagePayload});
                    return
                }
            }

            throw err
        }
    }
}


