import axios from 'axios';

// Creamos una instancia para tener control total
export const apiClient = axios.create({
  baseURL: 'https://api.devsetup.mock', // URL falsa, no importa
  timeout: 1000,
});