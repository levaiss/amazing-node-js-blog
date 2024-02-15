import { access, mkdir, writeFile } from 'fs/promises';

export async function ensureDirectoryExists(path: string) {
  try {
    await access(path);
  } catch (e) {
    await mkdir(path);
  }
}

export async function ensureFileExists(path: string, defaultData = '') {
  try {
    await access(path);
  } catch (e) {
    await writeFile(path, defaultData);
  }
}