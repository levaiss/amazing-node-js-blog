import passport from 'passport';

export function authHandlerMiddleware() {
  return passport.authenticate('jwt', { session: false });
}