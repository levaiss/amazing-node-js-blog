import { Request, Response, Router } from 'express';
import Busboy from 'busboy';
import { join } from 'node:path';
import { Writable } from 'node:stream';
import { appendFile } from 'node:fs/promises';
import { srcPath } from '../../utils/path-helper';
import { ensureDirectoryExists } from '../../utils/file-helper';
import { RequestStatusCodes } from '../../utils/request-status-codes';

const uploadRouter = Router();

const FileWritableStream = (filepath: string): Writable => {
  return new Writable({
    write: async function (chunk, encoding, next) {
      try {
        await appendFile(filepath, chunk);
        next();
      } catch (e: unknown) {
        next(e as Error);
      }
    }
  });
};

const maxFileSize: number = 500 * 1024 * 1024;
const validMimeTypes = ['video/mp4'];

uploadRouter.post('/', async (req: Request, res: Response) => {
  try {
    if (Number(req.headers['content-length']) > maxFileSize) {
      return res.status(RequestStatusCodes.BadRequest).json({
        message: 'Розмір файлу перевищує максимальний ліміт (500MB).'
      });
    }

    const busboy = Busboy({ headers: req.headers });
    const uploadsFolderPath = join(srcPath, 'uploads');
    let hasFile = false;

    await ensureDirectoryExists(uploadsFolderPath);

    busboy.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      if (!validMimeTypes.includes(mimeType)) {
        return res.status(RequestStatusCodes.BadRequest).json({
          message: 'Підтримуються тільки відеофайли у форматі MP4.'
        });
      }
      hasFile = true;

      const fileWritableStream = FileWritableStream(join(uploadsFolderPath, filename));

      file.pipe(fileWritableStream);
    });

    busboy.on('field', (fieldname) => {
      if (fieldname !== 'video') {
        return res.status(RequestStatusCodes.BadRequest).json({
          message: 'Параметр video обовʼязковий!'
        });
      }
    });

    busboy.on('close', () => {
      if (hasFile) {
        res.status(RequestStatusCodes.Success).json({
          message: 'Відео успішно збережено!'
        });
      } else {
        res.status(RequestStatusCodes.BadRequest).json({
          message: 'Невірний або відсутній файл video в form-data.'
        });
      }
    });

    req.pipe(busboy);
  } catch (e) {
    console.error('[uploadRouter.POST]', e);
    res.status(RequestStatusCodes.BadRequest).json({
      message: 'Під час завантаження файлу сталась помилка.',
    });
  }
});

export default uploadRouter;
