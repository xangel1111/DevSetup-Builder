import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.devsetup.mock',
  timeout: 1000,
});