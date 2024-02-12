import path from 'path';
import { Router, Request, Response } from 'express';
import { processImage } from '../../../utils/process-image';
import { srcPath } from '../../../utils/path-helper';
import { RequestStatusCodes } from '../../../utils/request-status-codes';
import { CustomError, ValidationError } from '../../../utils/error-helper';
import { ensureDirectoryExists } from '../../../utils/file-helper';

const filesRoute = Router();

filesRoute.post('/image', async (req: Request, res: Response) => {
  try {
    const {url} = req.body;
    if (!url) {
      throw new ValidationError('Url is required fields.');
    }

    const assetsFolder = path.join(srcPath, 'assets');
    await ensureDirectoryExists(assetsFolder);
    const imagesFolder = path.join(assetsFolder, 'images');
    await ensureDirectoryExists(imagesFolder);
    await processImage(url, imagesFolder);

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
