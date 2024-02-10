import { access, mkdir } from 'fs/promises';

export async function ensureDirectoryExists(directoryPath: string) {
  try {
    await access(directoryPath);
  } catch (e) {
    await mkdir(directoryPath);
  }
}