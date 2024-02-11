import { getUnitedData } from '../services/JSONPlaceholder/index.ts';

export async function getInfo() {
  return await getUnitedData();
}
