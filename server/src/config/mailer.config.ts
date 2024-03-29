// Core
import { type TransportOptions } from 'nodemailer';

// Helpers
import { MAILER_HOST, MAILER_PORT, MAILER_SECURE, MAILER_USER, MAILER_PASSWORD } from '../utils/env-helper';

export const mailerConfig = {
  host: MAILER_HOST,
  port: MAILER_PORT,
  secure: MAILER_SECURE,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASSWORD,
  },
} as TransportOptions;
