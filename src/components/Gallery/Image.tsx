import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  thumbnailPath: string;
  title?: string;
  subtitle?: string;
  onImageClick(id: string): void;
}

const StyledContainer = styled.div`
  position: relative;
  background: #fff;
  height: 100%;
`;

const StyledCaptions = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 5;
  font-size: 1.7rem;
  font-weight: 700;
  text-shadow: 2px 2px 5px #00000040;

  & > p {
    margin: 0;
    text-transform: uppercase;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 1;
  transition: .3s ease;

  &:hover {
    opacity 0.85;
  }
`;

export const Image: FC<Props> = (props) => {
  const { title, subtitle, onImageClick, thumbnailPath, id } = props;

  return (
    <StyledContainer>
      <StyledCaptions>
        {title && <p>{title}</p>}
        {subtitle && <p>{subtitle}</p>}
      </StyledCaptions>
      <StyledImage src={thumbnailPath} onClick={() => onImageClick(id)} />
    </StyledContainer>
  );
};
