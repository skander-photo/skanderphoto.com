import { makeAutoObservable, runInAction } from 'mobx';
import { CategoryService } from './../services/category-service';
import { Category } from './../types';
import { RootStore } from './index';

export class CategoryStore {
  readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.setCategories();
  }

  categories: { [id: string]: Category } = {};

  currentSelectedCategoryId = '';

  get currentCategory() {
    if (this.currentSelectedCategoryId) {
      return this.categories[this.currentSelectedCategoryId];
    }
    return undefined;
  }

  private async setCategories() {
    const categories = await CategoryService.fetchAll();
    runInAction(() => {
      categories.map((cat) => (this.categories[cat.id] = cat));
    });
  }

  selectCategory(id: string) {
    this.currentSelectedCategoryId = id;
  }

  selectGallery() {
    this.currentSelectedCategoryId = '';
  }
}
