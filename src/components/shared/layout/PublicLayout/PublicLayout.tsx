import { Observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useRootStore } from '../../../../store';
import logo from './logo-white.png';
import { Navigation } from './Navigation';
import './PublicLayout.scss';

interface Props {
  title: string;
}

export const PublicLayout: FC<Props> = (props) => {
  const { children, title } = props;

  const { categoryStore } = useRootStore();
  const history = useHistory();

  const onGalleryClick = () => {
    categoryStore.selectGallery();
    history.push('/');
  };

  const onCategoryClick = (categoryId: string) => {
    categoryStore.selectCategory(categoryId);
    history.push('/');
  };

  const onAboutClick = () => {
    history.push('/about');
  };

  const onContactClick = () => {
    history.push('/contact');
  };

  return (
    <Observer>
      {() => (
        <div className="layout">
          <nav className="layout__nav">
            <Navigation
              categories={Object.values(categoryStore.categories)}
              onGalleryClick={onGalleryClick}
              onCategoryClick={onCategoryClick}
              onAboutClick={onAboutClick}
              onContactClick={onContactClick}
            />
          </nav>
          <main className="layout__body">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <header className="layout__header">
              <div className="left">
                <div className="burger" onClick={() => console.log('Burger clicked')}>
                  <svg viewBox="0 0 100 80" width="30" height="30" fill="#b1b1b1">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                  </svg>
                </div>
                <div className="title">{title}</div>
              </div>
              <div className="copyright">
                © {new Date().getFullYear()} Skander Kchouk <br /> All Rights Reserved
              </div>
            </header>
            {children}
          </main>
        </div>
      )}
    </Observer>
  );
};
