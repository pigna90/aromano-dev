import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  margin: 1rem auto 3rem;
  max-width: 800px;
  padding: 0 1rem;
  position: relative;
`;

const CarouselContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f6fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CarouselItem = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #2c3e50;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: white;
  }
`;

const ConferenceGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Load images from the conferences folder
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Using import.meta.glob to load all images from the conferences folder
        const imageModules = import.meta.glob('/public/images/conferences/*.{png,jpg,jpeg,webp}', {
          eager: true,
          as: 'url'
        });
        
        const imageList = Object.values(imageModules);
        setImages(imageList);
      } catch (error) {
        console.error('Error loading conference images:', error);
        setImages([]);
      }
    };

    loadImages();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Auto-advance the carousel
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <GalleryContainer>
      <CarouselContainer>
        <AnimatePresence mode="wait">
          {images.length === 0 ? (
            <CarouselItem
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <CarouselItem
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={images[currentIndex]} 
                alt={`Conference moment ${currentIndex + 1}`} 
              />
            </CarouselItem>
          )}
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <NavigationButton className="prev" onClick={handlePrevious}>‹</NavigationButton>
            <NavigationButton className="next" onClick={handleNext}>›</NavigationButton>
            <Dots>
              {images.map((_, index) => (
                <Dot
                  key={index}
                  active={currentIndex === index}
                  onClick={() => handleDotClick(index)}
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