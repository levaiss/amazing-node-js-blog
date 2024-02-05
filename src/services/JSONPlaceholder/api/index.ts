import { AxiosPromise } from 'axios';
import { apiClient } from './apiClient.ts';
import { IJSONPlaceholderPost, IJSONPlaceholderComment, IJSONPlaceholderAlbum } from './entity.ts';

export const getPosts = (): AxiosPromise<IJSONPlaceholderPost[]> => {
  return apiClient.get('/posts');
};

export const getAlbums = (): AxiosPromise<IJSONPlaceholderAlbum[]> => {
  return apiClient.get(`/albums`);
};

export const getComments = (): AxiosPromise<IJSONPlaceholderComment[]> => {
  return apiClient.get('/comments');
};
