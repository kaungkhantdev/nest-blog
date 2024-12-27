import { createTransport, Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class Mail {
  private transporter: Transporter;

  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly service: string,
    private readonly secure: boolean,
    private readonly user: string,
    private readonly pass: string,
  ) {
    dotenv.config();

    this.transporter = createTransport({
      host: this.host,
      service: this.service,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  /** send mail service */
  async sendEmail(
    to: string,
    subject: string,
    templateVariables: object,
    templateName: string = 'otp-mail',
  ): Promise<void> {
    /** file path */
    const templatePath = path.join(
      __dirname + '/templates/' + templateName + '.hbs',
    );

    /** compile hbs */
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
    const html = template(templateVariables);

    /** mail options */
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html, // Use the HTML content for the email body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
}
