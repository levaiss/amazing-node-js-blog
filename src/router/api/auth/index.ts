import { Router } from 'express';
import { validationHandler } from '../../../middleware/validation-handler';
import { userSignInSchema, userSignUpSchema } from '../../../validation/user';
import { createUser, loginUser } from '../../../controllers/user-controller';

const router = Router();

router.post('/signin', validationHandler(userSignInSchema), loginUser);

router.post('/signup', validationHandler(userSignUpSchema), createUser);

export default router;
