import { createReadStream, createWriteStream } from 'fs';

export type TProcessFileTransformFn = (payload: string | Buffer) => string | Buffer;

export type TProcessFileResult = {
  status: boolean,
  message: string,
  data?: never
};

export function processFile(inputFilePath: string, outputFilePath: string, transformFn: TProcessFileTransformFn): Promise<TProcessFileResult> {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(inputFilePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(outputFilePath);

    readStream.on('data', (chunk) => {
      const updatedData = transformFn(chunk);
      writeStream.write(updatedData);
    });

    readStream.on('end', () => {
      writeStream.end();

      resolve({
        status: true,
        message: 'The operation was completed successfully. The results are written to the output file.'
      });
    });

    readStream.on('error', (error) => {
      reject({
        status: false,
        message: 'Error reading input file.',
        data: error
      });
    });

    writeStream.on('error', (error) => {
      reject({
        status: false,
        message: 'Error writing to output file.',
        data: error
      });
    });
  });
}