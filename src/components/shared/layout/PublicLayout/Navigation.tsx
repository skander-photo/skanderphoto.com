import React, { FC } from 'react';
import styled from 'styled-components';
import { Category } from '../../../../types';
import logo from './logo-white.png';
import './Navigation.scss';

const StyledLogoImg = styled.img`
  width: 100%;
`;

interface Props {
  categories: Category[];
  onGalleryClick(): void;
  onCategoryClick(categoryId: string): void;
  onAboutClick(): void;
  onContactClick(): void;
}

export const Navigation: FC<Props> = (props) => {
  const { categories, onGalleryClick, onCategoryClick, onAboutClick, onContactClick } = props;

  return (
    <div className="navigation">
      <StyledLogoImg src={logo} alt="logo" />
      <ul>
        <li>
          <span className="link" onClick={onGalleryClick}>
            Gallery
          </span>
          <ul>
            {categories.map((category) => (
              <span
                key={`category-${category.id}`}
                className="link"
                onClick={() => onCategoryClick(category.id)}
              >
                {category.name}
              </span>
            ))}
          </ul>
        </li>
        <li>
          <span className="link" onClick={onAboutClick}>
            About
          </span>
        </li>
        <li>
          <span className="link" onClick={onContactClick}>
            Contact
          </span>
        </li>
      </ul>
    </div>
  );
};
