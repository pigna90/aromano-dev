import { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${(props) => props.$borderRadius || '0'};
  background: ${({ theme }) => theme.colors.surfaceSunken};
  ${({ theme, $framed }) =>
    $framed ? `border: 4px solid ${theme.colors.surface};` : ''}
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.motion.base};
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceSunken} 25%,
    ${({ theme }) => theme.colors.bgAlt} 50%,
    ${({ theme }) => theme.colors.surfaceSunken} 75%
  );
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

const Image = ({ src, alt, borderRadius, framed = false, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer $borderRadius={borderRadius} $framed={framed}>
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
