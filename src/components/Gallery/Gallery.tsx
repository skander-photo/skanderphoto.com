import { Observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRootStore } from '../../store';
import { mod } from '../../utils/math';
import { PublicLayout } from '../shared/layout/PublicLayout/PublicLayout';
import { Image } from './Image';
import { LightBox } from './Lightbox/Lightbox';
import { GalleryType } from './type';

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;
`;
interface ImageInterface {
  index: number;
  src: string;
}

interface Props {}

export const Gallery: FC<Props> = (props) => {
  const { categoryStore, pictureStore } = useRootStore();
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<ImageInterface>();

  useEffect(() => {
    // Fill in fake images
    // TODO: fill with real images
    const tmp = [];
    for (let i = 0; i < 20; i++) {
      let image = `https://picsum.photos/id/${i + 106}/500`;
      tmp.push(image);
    }
    setImages(tmp);
  }, []);

  /*
  const onImageClickTmp = (src: string, index: any) => {
    setCurrentImage({ src, index });
    setIsLightBoxOpen(true);
  };
  */

  const onPreviousImageClick = () => {
    const currentIndex = currentImage?.index || 0;
    const prevIndex = mod(currentIndex - 1, images.length);
    const image = images[prevIndex];
    setCurrentImage({ src: image, index: prevIndex });
  };

  const onNextImageClick = () => {
    const currentIndex = currentImage?.index || 0;
    const nextIndex = mod(currentIndex + 1, images.length);
    const image = images[nextIndex];
    setCurrentImage({ src: image, index: nextIndex });
  };

  const galleryType = categoryStore.currentSelectedCategoryId
    ? GalleryType.Albums
    : GalleryType.Pictures;

  const onImageClick = (id: string) => {
    galleryType === GalleryType.Albums ? onAlbumClick(id) : onPictureClick(id);
  };

  const onPictureClick = (pictureId: string) => {
    const picture = pictureStore.pictures[pictureId];
    if (picture) {
      setIsLightBoxOpen(true);
    }
  };

  const onAlbumClick = (albumId: string) => {};

  // Page title
  const pageTitle =
    galleryType === GalleryType.Albums
      ? `${categoryStore.currentCategory?.name} / Albums`
      : 'Photos';

  return (
    <Observer>
      {() => (
        <PublicLayout title={pageTitle}>
          {isLightBoxOpen && (
            <LightBox
              imageSrc={currentImage?.src}
              onCloseClick={() => setIsLightBoxOpen(false)}
              onPrevClick={onPreviousImageClick}
              onNextClick={onNextImageClick}
            />
          )}
          <StyledGrid>
            {images.map((src, index) => (
              <Image
                key={index}
                thumbnailPath={src}
                onImageClick={onImageClick}
                id={index.toString()}
              />
            ))}
          </StyledGrid>
        </PublicLayout>
      )}
    </Observer>
  );
};
