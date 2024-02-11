import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootPath = path.resolve(path.join(__dirname, '../../'));
export const srcPath = path.resolve(path.join(__dirname, '../'));