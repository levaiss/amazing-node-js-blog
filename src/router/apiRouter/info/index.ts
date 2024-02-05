import { Router, Request, Response } from 'express';
import { RequestStatusCodes } from '../../../utils/request-status-codes.ts';
import { getInfo } from '../../../controllers/infoController.ts';

const infoRouter = Router();

infoRouter.get('/', async (req: Request, res: Response) => {
  try {
    const infoData = await getInfo();
    res.status(RequestStatusCodes.Success).json(infoData);
  } catch (e) {
    console.log('e', e);
    res.status(RequestStatusCodes.BadRequest).json({
      message: 'Something went wrong!',
    });
  }
});

export default infoRouter;
