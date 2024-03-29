// Models
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { MAILER_USER } from '../utils/env-helper';

export function getRegistrationEmail(user: IUserModel) {
  return {
    from: `"AmazingBlog" <${MAILER_USER}>`,
    to: user.email,
    subject: 'Welcome to our community!',
    text: `Hello, ${user.username}! We are glad to see you in our community!`,
  };
}
