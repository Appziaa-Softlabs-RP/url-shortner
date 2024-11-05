declare module 'zeptomail' {
    export class SendMailClient {
        constructor(options: { token: string });
        sendMail(options: {
            bounce_address: string;
            from: { address: string; name: string };
            to: Array<{ email_address: { address: string; name?: string } }>;
            subject: string;
            htmlbody?: string;
            textbody?: string;
            cc?: Array<{ email_address: { address: string; name?: string } }>;
            bcc?: Array<{ email_address: { address: string; name?: string } }>;
            reply_to?: { address: string; name?: string };
            attachments?: Array<{
                content: string;
                name: string;
            }>;
        }): Promise<any>;
    }
}