import { readFile, writeFile, access } from 'fs/promises';
import path from 'path';
import { IUser } from '../models/UserModel.ts';

interface IDbServiceResponse {
 users: IUser[]
}

export class DbService {
  private static instance: DbService;
  private static fullFilePath: string;

  private constructor() {
  }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }

    return DbService.instance;
  }

  async create(filePath: string, fileName: string, defaultData: IDbServiceResponse) {
    const fullFilePath = path.join(filePath, fileName);
    if (!fullFilePath) {
      throw new Error('filePath nad fileName is required properties!');
    }
    DbService.fullFilePath = fullFilePath;


    try {
      await access(fullFilePath);

      const existingData = await this.getData();
      const mergedData = { ...defaultData, ...existingData };

      await this.setData(mergedData);

      console.log(`File ${fileName} has been successfully updated!`);
    } catch (error) {
      await this.setData(defaultData);

      console.log(`File ${fileName} has been successfully created!`);
    }
  }

  async getData(): Promise<IDbServiceResponse> {
    return JSON.parse(await readFile(DbService.fullFilePath, 'utf-8'));
  }

  async setData(payload: IDbServiceResponse): Promise<void> {
    await writeFile(DbService.fullFilePath, JSON.stringify(payload), 'utf-8');
  }
}