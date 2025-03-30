import { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: ${props => props.$borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Image = ({ src, alt, borderRadius, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer $borderRadius={borderRadius}>
      <StyledImage
        src={src}
        alt={alt}
        $isLoaded={isLoaded}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {!isLoaded && <LoadingPlaceholder />}
    </ImageContainer>
  );
};

export default Image; 