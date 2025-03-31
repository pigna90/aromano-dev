import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';
import { getUpcomingConferences, getPastConferencesByYear } from '../data/conferences';
import ConferenceGallery from './ConferenceGallery';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 0.5rem;
  border-radius: 12px;
  width: fit-content;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    transform: none;
    width: 100%;
    max-width: 300px;
  }
`;

const TabButton = styled.button`
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#2c3e50' : '#7f8c8d'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '600' : '500'};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    color: ${props => props.$active ? '#2c3e50' : '#3498db'};
    background: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  position: relative;
  padding: 0 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 36px;
  height: 18px;
  background: ${props => props.$active ? '#3498db' : '#bdc3c7'};
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.$active ? '20px' : '2px'};
    transition: all 0.2s ease;
  }
`;

const ConferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ConferenceItem = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: grid;
  grid-template-columns: 140px 1fr;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

const DateSection = styled.div`
  background: ${props => props.$type === 'upcoming' ? 'rgba(52, 152, 219, 0.1)' : 'rgba(44, 62, 80, 0.1)'};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e0e0e0;

  .month {
    color: ${props => props.$type === 'upcoming' ? '#3498db' : '#2c3e50'};
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
  }

  .day {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    line-height: 1;
    margin: 0.3rem 0;
  }

  .status {
    font-size: 0.75rem;
    color: ${props => props.$type === 'upcoming' ? '#3498db' : '#7f8c8d'};
    padding: 0.15rem 0.6rem;
    background: white;
    border-radius: 12px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileDateSection = styled.div`
  display: none;
  background: ${props => props.$type === 'upcoming' ? 'rgba(52, 152, 219, 0.1)' : 'rgba(44, 62, 80, 0.1)'};
  padding: 0.75rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  height: 48px;

  .month {
    color: ${props => props.$type === 'upcoming' ? '#3498db' : '#2c3e50'};
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1;
  }

  .day {
    font-size: 0.9rem;
    font-weight: bold;
    color: #2c3e50;
    line-height: 1;
    margin: 0;
  }

  .status {
    font-size: 0.75rem;
    color: ${props => props.$type === 'upcoming' ? '#3498db' : '#7f8c8d'};
    padding: 0.15rem 0.6rem;
    background: white;
    border-radius: 12px;
    font-weight: 500;
  }

  .date-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const VideoIcon = styled.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #3498db;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 0.7rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
  z-index: 2;

  &:hover {
    transform: scale(1.1);
    background: rgba(52, 152, 219, 0.2);
  }

  &::before {
    content: "▶";
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    position: static;
    width: 28px;
    height: 28px;
    padding: 0.4rem;
    background: transparent;
    margin-left: 0.75rem;

    &::before {
      font-size: 1.8rem;
    }

    &:hover {
      transform: scale(1.05);
      background: transparent;
    }
  }
`;

const DesktopVideoIcon = styled(VideoIcon)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileVideoIcon = styled(VideoIcon)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const ContentSection = styled.div`
  padding: 1rem;
  position: relative;

  h3 {
    color: #2c3e50;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    font-weight: 600;

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
      font-weight: 600;

      &:hover {
        color: #3498db;
      }
    }
  }

  .topic {
    color: #3498db;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  p {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const GallerySection = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  position: relative;
`;

const SlideShow = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SlideInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
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

const YearSection = styled.div`
  margin: 2rem 0;
`;

const YearTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShowMoreButton = styled.button`
  background: transparent;
  border: none;
  color: #3498db;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const VideoFilterButton = styled.button`
  background: ${props => props.active ? 'rgba(52, 152, 219, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: relative;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }

  &::before {
    content: "🎥";
    font-size: 1.2rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #3498db;
    border-radius: 50%;
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
`;

const Conferences = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showVideosOnly, setShowVideosOnly] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedYears, setExpandedYears] = useState({});
  const slideInterval = 5000;

  // Get conferences data
  const upcomingConferences = getUpcomingConferences()
    .filter(conf => !showVideosOnly || conf.video_link)
    .map(conf => ({
      ...conf,
      month: new Date(conf.date).toLocaleString('en-US', { month: 'long' }),
      day: new Date(conf.date).getDate().toString(),
      type: 'upcoming'
    }));
  const pastConferences = getPastConferencesByYear();

  // Filter past conferences by video if needed
  if (showVideosOnly) {
    Object.keys(pastConferences).forEach(year => {
      pastConferences[year] = pastConferences[year].filter(conf => conf.video_link);
    });
  }

  // Get all conference images for the gallery
  const galleryImages = [
    ...upcomingConferences
      .filter(conf => conf.image)
      .map(conf => ({
        src: conf.image,
        alt: `Speaking at ${conf.title}`,
        title: conf.title,
        description: conf.description
      })),
    ...Object.values(pastConferences)
      .flat()
      .filter(conf => conf.image)
      .slice(0, 3)
      .map(conf => ({
        src: conf.image,
        alt: `Speaking at ${conf.title}`,
        title: conf.title,
        description: conf.description
      }))
  ];

  // Only show gallery if there are images
  const hasGalleryImages = galleryImages.length > 0;

  const years = Object.keys(pastConferences).sort((a, b) => b - a);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const renderConferences = () => {
    if (activeTab === 'upcoming') {
      return (
        <ConferenceList>
          {upcomingConferences.map((conf, index) => (
            <ConferenceItem
              key={conf.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => conf.info_link && window.open(conf.info_link, '_blank', 'noopener,noreferrer')}
            >
              <DateSection $type={conf.type}>
                <span className="month">{conf.month}</span>
                <span className="day">{conf.day}</span>
                <span className="status">{conf.type}</span>
              </DateSection>
              <MobileDateSection $type={conf.type}>
                <div className="date-info">
                  <span className="month">{conf.month}</span>
                  <span className="day">{conf.day}</span>
                  <span className="status">{conf.type}</span>
                </div>
                {conf.video_link && (
                  <MobileVideoIcon
                    href={conf.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(conf.video_link, '_blank', 'width=800,height=600');
                    }}
                    title="Watch video"
                  />
                )}
              </MobileDateSection>
              <ContentSection>
                <h3>{conf.title}</h3>
                <div className="topic">{conf.topic}</div>
                <p>{conf.description}</p>
                {conf.video_link && (
                  <DesktopVideoIcon
                    href={conf.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(conf.video_link, '_blank', 'width=800,height=600');
                    }}
                    title="Watch video"
                  />
                )}
              </ContentSection>
            </ConferenceItem>
          ))}
        </ConferenceList>
      );
    }

    return (
      <AnimatePresence mode="wait">
        {years.map(year => (
          <YearSection key={year}>
            <YearTitle>
              <span>{year}</span>
              <ShowMoreButton onClick={() => toggleYear(year)}>
                {expandedYears[year] ? 'Show Less' : 'Show All'}
              </ShowMoreButton>
            </YearTitle>
            <ConferenceList>
              {pastConferences[year]
                .slice(0, expandedYears[year] ? undefined : 3)
                .map((conf, index) => (
                  <ConferenceItem
                    key={conf.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => conf.info_link && window.open(conf.info_link, '_blank', 'noopener,noreferrer')}
                  >
                    <DateSection $type="past">
                      <span className="month">{conf.month}</span>
                      <span className="day">{new Date(conf.date).getDate().toString()}</span>
                      <span className="status">past</span>
                    </DateSection>
                    <MobileDateSection $type="past">
                      <div className="date-info">
                        <span className="month">{conf.month}</span>
                        <span className="day">{new Date(conf.date).getDate().toString()}</span>
                        <span className="status">past</span>
                      </div>
                      {conf.video_link && (
                        <MobileVideoIcon
                          href={conf.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(conf.video_link, '_blank', 'width=800,height=600');
                          }}
                          title="Watch video"
                        />
                      )}
                    </MobileDateSection>
                    <ContentSection>
                      <h3>{conf.title}</h3>
                      <div className="topic">{conf.topic}</div>
                      <p>{conf.description}</p>
                      {conf.video_link && (
                        <DesktopVideoIcon
                          href={conf.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(conf.video_link, '_blank', 'width=800,height=600');
                          }}
                          title="Watch video"
                        />
                      )}
                    </ContentSection>
                  </ConferenceItem>
                ))}
            </ConferenceList>
          </YearSection>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <Section id="conferences">
      <SectionContent>
        <Title>Conferences</Title>
        
        <ConferenceGallery />
        
        {hasGalleryImages && (
          <GallerySection>
            <SlideShow>
              <AnimatePresence mode="wait">
                <Slide
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={galleryImages[currentSlide].src} 
                    alt={galleryImages[currentSlide].alt} 
                  />
                  <SlideInfo
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4>{galleryImages[currentSlide].title}</h4>
                    <p>{galleryImages[currentSlide].description}</p>
                  </SlideInfo>
                </Slide>
              </AnimatePresence>
              
              <NavigationButton className="prev" onClick={prevSlide}>
                ‹
              </NavigationButton>
              <NavigationButton className="next" onClick={nextSlide}>
                ›
              </NavigationButton>

              <Dots>
                {galleryImages.map((_, index) => (
                  <Dot
                    key={index}
                    active={currentSlide === index}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </Dots>
            </SlideShow>
          </GallerySection>
        )}

        <ControlsContainer>
          <TabContainer>
            <TabButton 
              $active={activeTab === 'upcoming'} 
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </TabButton>
            <TabButton
              $active={activeTab === 'past'}
              onClick={() => setActiveTab('past')}
            >
              Past
            </TabButton>
          </TabContainer>

          <ToggleContainer>
            <ToggleLabel>Videos Only</ToggleLabel>
            <ToggleSwitch
              $active={showVideosOnly}
              onClick={() => setShowVideosOnly(!showVideosOnly)}
              title={showVideosOnly ? "Show all conferences" : "Show only conferences with videos"}
            />
          </ToggleContainer>
        </ControlsContainer>

        {renderConferences()}
      </SectionContent>
    </Section>
  );
};

export default Conferences; 