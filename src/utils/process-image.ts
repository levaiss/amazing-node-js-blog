import axios from 'axios';
import { writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { ValidationError } from './error-helper';

export async function processImage(imageUrl: string, outputPath: string, validFileExtensions = ['.jpg', '.png']) {
  if (!imageUrl || !outputPath) {
    throw new ValidationError('ImageUrl and outputPath is required properties');
  }

  const urlParts = new URL(imageUrl);
  const fileNameWithExtension = basename(urlParts.pathname);
  const fileExtension = extname(fileNameWithExtension).toLowerCase();

  if (!validFileExtensions.includes(fileExtension)) {
    throw new ValidationError(`Unsupported file extension. Only the following are supported: ${validFileExtensions.join(', ')}`);
  }

  const { data: imageBuffer } = await axios.get(imageUrl, { responseType: 'arraybuffer' });

  const fullOutputPath = join(outputPath, fileNameWithExtension);
  await writeFile(fullOutputPath, imageBuffer);
}