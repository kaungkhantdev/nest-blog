import { Mail } from '@/pkg/mail/mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly host: string;
  private readonly port: number;
  private readonly user: string;
  private readonly pass: string;
  private readonly service: string;
  private readonly secure: boolean = false;
  private readonly mail: Mail;

  constructor() {
    this.host = process.env.MAIL_HOST;
    this.port = parseInt(process.env.MAIL_PORT);
    this.user = process.env.MAIL_USER;
    this.pass = process.env.MAIL_PASS;
    this.secure = process.env.MAIL_SECURE === 'true';
    this.service = process.env.MAIL_SERVICE;
    this.mail = new Mail(
      this.host,
      this.port,
      this.service,
      this.secure,
      this.user,
      this.pass,
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    templateVariables: Record<string, string | number>,
    templateData: string,
    cc?: string | string[],
    bcc?: string | string[],
    documentUrl?: boolean,
    documentData?: { filename: string; content: any; encoding: 'base64' }[],
  ): Promise<void> {
    await this.mail.sendEmailHtmlReusable(
      to,
      subject,
      templateVariables,
      templateData,
      cc,
      bcc,
      documentUrl,
      documentData,
    );
  }
}
