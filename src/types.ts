export interface Category {
  id: string;
  name: string;
  albums: Album[];
}

export interface Album {
  id: string;
  title: string;
  subtitle?: string;
  pictures: Picture[];
  coverImagePath?: string;
}

export interface Picture {
  id: string;
  largePath: string;
  thumbnailPath: string;
  createdAt: Date;
}
