import { getPosts, getAlbums, getComments } from './api/index.ts';
import { IJSONPlaceholderPost, IJSONPlaceholderAlbum, IJSONPlaceholderComment } from './api/entity.ts';
import { AxiosResponse } from 'axios';

export const getUnitedData = async () => {
  const requests = [getPosts, getAlbums, getComments];
  const requestsResults: (
    | AxiosResponse<IJSONPlaceholderPost[]>
    | AxiosResponse<IJSONPlaceholderAlbum[]>
    | AxiosResponse<IJSONPlaceholderComment[]>
  )[] = [];

  for (const request of requests) {
    requestsResults.push(await request());
  }

  const results: (IJSONPlaceholderPost[] | IJSONPlaceholderAlbum[] | IJSONPlaceholderComment[])[] = [];
  return requestsResults.reduce((accum, requestsResult) => {
    accum.push(requestsResult.data);

    return accum;
  }, results);
};
