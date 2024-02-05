import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.JSONPLACEHOLDER_API_URL;

console.log('baseURL', baseURL);

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});
