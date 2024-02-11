import path from 'path';
import { Router, Request, Response } from 'express';
import { processImage } from '../../../utils/process-image.ts';
import { rootPath } from '../../../utils/path-helper.ts';
import { RequestStatusCodes } from '../../../utils/request-status-codes.ts';
import { CustomError, ValidationError } from '../../../utils/error-halper.ts';

const filesRoute = Router();

filesRoute.post('/image', async (req: Request, res: Response) => {
  try {
    const {url} = req.body;
    if (!url) {
      throw new ValidationError('Url is required fields.');
    }

    await processImage(url, path.join(rootPath, 'public', 'images'));

    res.status(RequestStatusCodes.Success).json({
      message: 'Image saved successfully!'
    });
  } catch (e) {
    if (e instanceof CustomError) {
      const {code, message} = e;
      res.status(code).json({
        message
      });
    } else {
      res.status(RequestStatusCodes.InternalServerError).json({
        message: 'Something went wrong!'
      });
    }
  }
});

export default filesRoute;
