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

/*
 * Eager images paint immediately. Holding them at opacity 0 until `onLoad`
 * fired meant the largest image on the page could not be the Largest
 * Contentful Paint until a whole extra frame had gone by, so the fade is now
 * reserved for images that arrive late enough for it to hide something.
 */
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
  opacity: ${({ $isLoaded, $fade }) => ($isLoaded || !$fade ? 1 : 0)};
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

const Image = ({
  src,
  alt,
  width,
  height,
  borderRadius,
  framed = false,
  // Anything above the fold should be `eager` with `fetchPriority="high"`, so
  // that the browser is not told to deprioritise the very image it will end up
  // measuring as the LCP.
  loading = 'lazy',
  fetchPriority = 'auto',
  fit = 'cover',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const fade = loading === 'lazy';

  return (
    <ImageContainer $borderRadius={borderRadius} $framed={framed}>
      <StyledImage
        src={src}
        alt={alt}
        /* Intrinsic dimensions let the browser reserve the right box before the
           bytes land, which is what keeps these out of the CLS score. */
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        $fit={fit}
        $fade={fade}
        $isLoaded={isLoaded}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {fade && !isLoaded && <LoadingPlaceholder />}
    </ImageContainer>
  );
};

export default Image;
