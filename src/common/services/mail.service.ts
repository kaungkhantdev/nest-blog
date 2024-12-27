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
    this.host = 'your_host';
    this.port = 587;
    this.user = 'your_user';
    this.pass = 'your_pass';
    this.service = 'gmail';
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
    templateVariables: object,
    templateName: string,
  ): Promise<void> {
    await this.mail.sendEmail(to, subject, templateVariables, templateName);
  }
}
