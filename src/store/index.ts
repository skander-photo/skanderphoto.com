import { createContext, useContext } from 'react';
import { CategoryStore } from './category-store';
import { PictureStore } from './picture-store';

export class RootStore {
  readonly categoryStore: CategoryStore;
  readonly pictureStore: PictureStore;

  constructor() {
    this.categoryStore = new CategoryStore(this);
    this.pictureStore = new PictureStore(this);
  }
}

export const initialStore = new RootStore();
export const RootStoreContext = createContext(initialStore);
export const useRootStore = () => useContext(RootStoreContext);
