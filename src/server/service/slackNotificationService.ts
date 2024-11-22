import {WebClient} from "@slack/web-api";


interface NotificationPayload{
    message: string,
}

export class slackNotificationService{
    private readonly slack: WebClient;
    private readonly channel: string;

    constructor( channel:string="#order" ){
        this.slack = new WebClient(process.env.SLACK_API_TOKEN)
        this.channel = channel;

    }
    async notifyAdmin(payload: NotificationPayload): Promise<boolean> {
        const {message} = payload
        try {
            const response = await this.slack.chat.postMessage({
                text:message,
                channel:this.channel,
                icon_emoji:"slack"
            })
            if(!response.ok){
                throw new Error(`slack 메시지 전송 실패 :Slack API error : ${response.error || '알 수 없는 에러'}`)
            }
            return response.ok
        }catch (err){
            if( err instanceof Error){
                if ((err as any).code === 'ECONNREFUSED') {
                    // 서버 연결 실패시 재시도 로직 추가
                    console.log('서버 연결 실패. 3초 후 재시도합니다.');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await this.slack.chat.postMessage({
                        text: message,
                        channel: this.channel,
                        icon_emoji: "slack"
                    });
                    return
                }
            }

            throw err
        }
    }
    }