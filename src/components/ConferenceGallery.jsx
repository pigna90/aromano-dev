import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { conferenceGallery } from '../data/conferenceGallery';

const GalleryContainer = styled.figure`
  margin: 0 0 3rem;
  position: relative;
`;

/*
 * The photos are all 3:2, so 16:9 trims about 16% of their height: enough to
 * keep the frame cinematic, nowhere near the third that 21:9 was taking off the
 * top and bottom. On a phone the frame goes back to 3:2 so nothing is cropped
 * at the size where the subject is already small.
 */
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceSunken};
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHardLg};

  @media (max-width: 768px) {
    aspect-ratio: 3 / 2;
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

/*
 * Names the stage in the current frame. Half the point is that it is real text:
 * the photographs are the strongest proof on the page that the talks happened,
 * and without a caption the venues exist nowhere a search engine can read them.
 */
const Caption = styled.figcaption`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding-top: 0.85rem;
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
  const images = conferenceGallery;

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
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={images[currentIndex].width}
              height={images[currentIndex].height}
              /* The first frame is the one the carousel opens on, so it is the
                 only slide worth fetching eagerly. */
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
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
                  key={image.src}
                  $active={currentIndex === index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to photo ${index + 1}: ${image.caption}`}
                />
              ))}
            </Dots>
          </>
        )}
      </CarouselContainer>
      <Caption>{images[currentIndex].caption}</Caption>
    </GalleryContainer>
  );
};

export default ConferenceGallery;
