import { createTransport, type SendMailOptions, type TransportOptions, type Transporter } from 'nodemailer';

export default class MailService {
  private static instance: MailService;
  private static transporter?: Transporter;

  constructor() {}

  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }

    return MailService.instance;
  }

  initialization(config: TransportOptions) {
    MailService.transporter = createTransport(config);
  }

  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    if (!MailService.transporter) {
      throw new Error('Mail service is not initialized');
    }

    try {
      const info = await MailService.transporter.sendMail(mailOptions);

      console.info('Mail sent successfully: ', info.response);
    } catch (error) {
      console.error('Error while sending mail: ', error);
    }
  }
}
