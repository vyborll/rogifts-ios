import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/index';
import { logout } from '../store/reducers/user';

const DEV_URL = 'http://localhost:3000/api';
const PROD_URL = 'http://api.rogifts.com/api';

const api = axios.create({
  baseURL: PROD_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        await AsyncStorage.removeItem('@token');
      }

      await removeAuthToken();
      store.dispatch(logout());
    }

    return Promise.reject(err);
  }
);

export const setAuthToken = async (token: string): Promise<void> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return Promise.resolve();
};

export const removeAuthToken = async (): Promise<void> => {
  delete api.defaults.headers.common['Authorization'];
  return Promise.resolve();
};

export default api;
