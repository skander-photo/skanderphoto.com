import { Category } from './../types';
import { axiosInstance } from './axios';

export class CategoryService {
  static async fetchAll() {
    const res = await axiosInstance.get<{ categories: Category[] }>('/categories');
    return res.data.categories;
  }
}
