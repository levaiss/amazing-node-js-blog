import path from 'path';
import { ensureDirectoryExists, ensureFileExists } from '../../utils/file-helper';
import { processFile } from '../../utils/process-file';
import { TEST_DATA } from './test-data';

export default async function(): Promise<void> {
  try {
    const resultFolderPath = path.join(__dirname, 'result');
    await ensureDirectoryExists(resultFolderPath)

    const inputFilePath = path.join(resultFolderPath, 'input.txt');
    await ensureFileExists(inputFilePath, TEST_DATA);

    const outputFilePath = path.join(resultFolderPath, 'output.txt');
    await ensureFileExists(outputFilePath);

    const { message } =  await processFile(inputFilePath, outputFilePath, (payload) => {
      return payload.toString().toUpperCase();
    });
    console.log('[Task 1]: ', message);
  } catch (e) {
    console.error('[Task 1]: ', e);
  }
}