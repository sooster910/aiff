import {MessagePayloadWithTextRequired} from "@server/gateways/SlackNotificationSender";


export interface NotificationSender {
    sendSlackMessage(messagePayload: MessagePayloadWithTextRequired): Promise<void>;
}

export class NotificationService {
    constructor(private sender: NotificationSender) {}

    async notifySlack( messagePayload : MessagePayloadWithTextRequired) {
        return this.sender.sendSlackMessage(messagePayload);
    }
}
