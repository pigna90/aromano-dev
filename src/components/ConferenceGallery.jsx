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
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceSunken};
  border: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (max-width: 768px) {
    aspect-ratio: 16 / 10;
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
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  color: ${({ theme }) => theme.colors.ink};
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  box-shadow: ${({ theme }) => theme.colors.shadowMd};
  transition: background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1.05rem;

    &.prev {
      left: 0.6rem;
    }

    &.next {
      right: 0.6rem;
    }
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(6px);
  z-index: 2;
`;

const Dot = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(props) => (props.$active ? '#fff' : 'rgba(255, 255, 255, 0.42)')};
  transition: background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};
  transform: ${(props) => (props.$active ? 'scale(1.25)' : 'scale(1)')};

  &:hover {
    background: #fff;
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
