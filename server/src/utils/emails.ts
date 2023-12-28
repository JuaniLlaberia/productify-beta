import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from './emailTemplates/verificationEmail';

type UserInfo = {
  fullName?: string;
  email: string;
};

export class Email {
  to: string;
  from: string;
  name?: string;
  url?: string;

  constructor(userInfo: UserInfo, url?: string) {
    this.to = userInfo.email;
    this.name = userInfo.fullName;
    this.url = url;
    this.from = `Arkides <arkides@gmail.com.ar>`;
  }

  newTransport() {
    //Brevo provider
    return nodemailer.createTransport({
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_PASSWORD,
      },
      port: Number(process.env.BREVO_PORT),
      host: process.env.BREVO_HOST,
    });
  }

  async send(html: string, subject: string) {
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(emailOptions);
  }

  verificationCode(code: string) {
    this.send(verificationEmailTemplate(code), 'Temporary X login code');
  }
}
