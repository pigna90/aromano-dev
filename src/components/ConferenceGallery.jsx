import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  margin-bottom: 3rem;
  position: relative;
`;

const CarouselContainer = styled.div`
  position: relative;
  aspect-ratio: 21 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceSunken};
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHardLg};

  @media (max-width: 768px) {
    aspect-ratio: 16 / 10;
    border-width: ${({ theme }) => theme.borders.base};
    box-shadow: ${({ theme }) => theme.colors.shadowHard};
  }
`;

const CarouselItem = styled(motion.div)`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.bg};
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.ink};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.35rem;
  line-height: 1;
  transition: background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    font-size: 1.1rem;
    border-width: ${({ theme }) => theme.borders.thin};

    &.prev {
      left: 0.6rem;
    }

    &.next {
      right: 0.6rem;
    }
  }
`;

/*
 * An opaque black bar in the corner, not a floating blurred pill. The colours
 * here are literal rather than themed: this sits on top of a photograph, so it
 * has to read the same in light and dark.
 */
const Dots = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 0.35rem;
  padding: 0.6rem 0.75rem;
  background: #0d0d0d;
  border-top: ${({ theme }) => theme.borders.thin} solid #f4f1e6;
  border-right: ${({ theme }) => theme.borders.thin} solid #f4f1e6;
  z-index: 2;
`;

const Dot = styled.button`
  width: 16px;
  height: 8px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(props) => (props.$active ? '#FFE800' : 'rgba(244, 241, 230, 0.4)')};
  transition: background ${({ theme }) => theme.motion.fast};

  &:hover {
    background: #ffe800;
  }
`;

const ConferenceGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Load every image sitting in public/images/conferences
  useEffect(() => {
    try {
      const imageModules = import.meta.glob(
        '/public/images/conferences/*.{png,jpg,jpeg,webp}',
        { eager: true, query: '?url', import: 'default' }
      );
      setImages(Object.values(imageModules));
    } catch (error) {
      console.error('Error loading conference images:', error);
      setImages([]);
    }
  }, []);

  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  // Auto-advance the carousel
  useEffect(() => {
    if (images.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <GalleryContainer>
      <CarouselContainer>
        <AnimatePresence mode="wait">
          <CarouselItem
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <img
              src={images[currentIndex]}
              alt={`Speaking at a conference (${currentIndex + 1} of ${images.length})`}
            />
          </CarouselItem>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <NavigationButton
              className="prev"
              onClick={handlePrevious}
              aria-label="Previous photo"
            >
              ‹
            </NavigationButton>
            <NavigationButton
              className="next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              ›
            </NavigationButton>
            <Dots>
              {images.map((image, index) => (
                <Dot
                  key={image}
                  $active={currentIndex === index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </Dots>
          </>
        )}
      </CarouselContainer>
    </GalleryContainer>
  );
};

export default ConferenceGallery;
