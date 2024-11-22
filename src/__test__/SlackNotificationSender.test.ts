import {WebClient} from "@slack/web-api";
import {
    SlackNotificationSender
} from "@server/gateways/SlackNotificationSender";
import {slackNotificationService} from "@server/service/slackNotificationService";

jest.mock("@slack/web-api");

describe("SlackNotificationSender gateway 테스트 ", ()=>{
    let slackNotificationSender: SlackNotificationSender;
    let mockSlackClient: WebClient;
    let spyNotifyAdmin: jest.SpyInstance;  // spy 추가
    let service:slackNotificationService;
    beforeEach(() => {
        mockSlackClient = {
            chat:{
                postMessage:jest.fn().mockResolvedValue({ok:true})
            }
        } as unknown as WebClient

        // 서비스 인스턴스 생성
        slackNotificationSender = new SlackNotificationSender(mockSlackClient); // 외부에서 주입

        spyNotifyAdmin = jest.spyOn(slackNotificationSender, "sendSlackMessage");

    });

    test("기본 설정값이 적용되는지 테스트", async()=>{
        //Arrange
        const originalMessage = "Hello Slack!"
        const payload = { text: originalMessage}
        //Act
        await slackNotificationSender.sendSlackMessage(payload)
        //Assert
        expect(mockSlackClient.chat.postMessage).toHaveBeenCalledWith(
            {
                text: 'Hello Slack!',
                channel: '#order',
                icon_emoji: 'slack'

            }
        )

    })


})