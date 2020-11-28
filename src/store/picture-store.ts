import { makeAutoObservable } from 'mobx';
import { mod } from '../utils/math';
import { Picture } from './../types';
import { RootStore } from './index';

export class PictureStore {
  readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  pictures: { [id: string]: Picture } = {};

  addPicture(pic: Picture) {
    this.pictures[pic.id] = pic;
  }

  resetPictures() {
    this.pictures = {};
  }

  get pictureIds() {
    return Object.keys(this.pictures);
  }

  getNextPicture(id: string) {
    const pictureIds = this.pictureIds;
    const currentIndex = pictureIds.indexOf(id);
    const nextIndex = mod(currentIndex + 1, pictureIds.length);
    return this.pictures[pictureIds[nextIndex]];
  }

  getPreviousPicture(id: string) {
    const pictureIds = this.pictureIds;
    const currentIndex = pictureIds.indexOf(id);
    const prevIndex = mod(currentIndex - 1, pictureIds.length);
    return this.pictures[pictureIds[prevIndex]];
  }
}
