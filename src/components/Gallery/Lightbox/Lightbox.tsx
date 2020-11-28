import React, { FC, useEffect, useRef } from 'react';
import './Lightbox.scss';

interface Props {
  imageSrc?: string;
  onCloseClick(): void;
  onNextClick(): void;
  onPrevClick(): void;
}

export const LightBox: FC<Props> = (props) => {
  const { imageSrc, onCloseClick, onNextClick, onPrevClick } = props;
  const imageRef = useRef<any>();

  useEffect(() => {
    const captureKeyboardEvents = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 27: // Escape
          onCloseClick();
          break;
        case 37: // Left arrow
          onPrevClick();
          break;
        case 39: // Right arrow
          onNextClick();
          break;
        default:
          break;
      }
    };

    const captureRightClick = (e: Event) => {
      e.preventDefault();
    };

    const handleClickOutside = (e: any) => {
      const isButtonClick = e.target['tagName'] === 'BUTTON';
      const isOutsideClick = !imageRef?.current?.contains(e.target);
      if (!isButtonClick && isOutsideClick) {
        onCloseClick();
      }
    };

    document.addEventListener('keydown', captureKeyboardEvents);
    document.addEventListener('contextmenu', captureRightClick);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', captureKeyboardEvents);
      document.removeEventListener('contextmenu', captureRightClick);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseClick, onPrevClick, onNextClick]);

  return (
    <div className={`lightbox`}>
      <button className="lightbox__close" title="Close" onClick={onCloseClick}></button>
      <button className="lightbox__next" title="Next image" onClick={onNextClick}></button>
      <button className="lightbox__previous" title="Previous image" onClick={onPrevClick}></button>
      <div className="lightbox__container">
        <img src={imageSrc} alt="" ref={imageRef} />
      </div>
    </div>
  );
};
