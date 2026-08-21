import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  Section,
  SectionContent,
  Title,
  buttonReset,
} from '../styles/SharedStyles';
import { getUpcomingConferences, getPastConferencesByYear } from '../data/conferences';
import ConferenceGallery from './ConferenceGallery';

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`;

/** Hairline segmented control rather than a filled pill group. */
const Tabs = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.bgAlt};
`;

const TabButton = styled.button`
  ${buttonReset}
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.55rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $active }) => ($active ? theme.colors.surface : 'transparent')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.ink : theme.colors.inkMuted};
  box-shadow: ${({ theme, $active }) => ($active ? theme.colors.shadowSm : 'none')};
  transition: color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  .count {
    color: ${({ theme }) => theme.colors.inkMuted};
    margin-left: 0.45rem;
  }
`;

const FilterToggle = styled.button`
  ${buttonReset}
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accentInk : theme.colors.inkMuted};
  transition: color ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  .track {
    position: relative;
    width: 34px;
    height: 18px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.accent : theme.colors.hairlineStrong};
    transition: background ${({ theme }) => theme.motion.fast};

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: ${({ $active }) => ($active ? '18px' : '2px')};
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.surface};
      transition: left ${({ theme }) => theme.motion.fast};
    }
  }
`;

const ConferenceList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
`;

/**
 * One talk per row: mono date rail on the left, content on the right, hairline
 * separators. Rows are only clickable when there's somewhere to go.
 */
const ConferenceItem = styled(motion.article)`
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr) auto;
  gap: 1.75rem;
  align-items: start;
  padding: 1.5rem 0.75rem;
  margin: 0 -0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme, $clickable }) =>
      $clickable ? theme.colors.bgAlt : 'transparent'};
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem 1rem;
    padding: 1.25rem 0.6rem;
  }

  .date {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMuted};
    padding-top: 0.35rem;
    white-space: nowrap;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      padding-top: 0;
      order: -1;
    }
  }

  .upcoming-marker {
    color: ${({ theme }) => theme.colors.accent};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.375rem;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 0.3rem;
  }

  .topic {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.accentInk};
    margin-bottom: 0.5rem;
  }

  .location {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMuted};
  }
`;

const VideoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 0.7rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accentInk};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  transition: background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }
`;

const YearSection = styled.div`
  margin-bottom: 2.5rem;
`;

const YearHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;

  h3 {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: ${({ theme }) => theme.colors.ink};
    margin: 0;
  }
`;

const ShowMoreButton = styled.button`
  ${buttonReset}
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accentInk};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
`;

const EmptyState = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 2rem 0;
`;

const COLLAPSED_PER_YEAR = 3;

const formatDate = (value) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const Conferences = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showVideosOnly, setShowVideosOnly] = useState(false);
  const [expandedYears, setExpandedYears] = useState({});

  const upcomingConferences = useMemo(
    () =>
      getUpcomingConferences().filter(
        (conf) => !showVideosOnly || Boolean(conf.video_link)
      ),
    [showVideosOnly]
  );

  const pastByYear = useMemo(
    () =>
      Object.entries(getPastConferencesByYear())
        .map(([year, confs]) => [
          year,
          confs.filter((conf) => !showVideosOnly || Boolean(conf.video_link)),
        ])
        .filter(([, confs]) => confs.length > 0)
        .sort(([a], [b]) => Number(b) - Number(a)),
    [showVideosOnly]
  );

  const pastCount = pastByYear.reduce((total, [, confs]) => total + confs.length, 0);

  const toggleYear = (year) =>
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));

  const renderItem = (conf, index, { upcoming = false } = {}) => {
    const clickable = Boolean(conf.info_link);

    return (
      <ConferenceItem
        key={`${conf.title}-${conf.date}`}
        $clickable={clickable}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
        onClick={clickable ? () => openLink(conf.info_link) : undefined}
      >
        <div className="date">
          {upcoming && <span className="upcoming-marker">● </span>}
          {formatDate(conf.date)}
        </div>

        <div>
          <h3>{conf.title}</h3>
          <p className="topic">{conf.topic}</p>
          <span className="location">
            <FontAwesomeIcon icon={faLocationDot} />
            {conf.location}
          </span>
        </div>

        {conf.video_link ? (
          <VideoButton
            href={conf.video_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            aria-label={`Watch the talk from ${conf.title}`}
            title="Watch the talk"
          >
            <FontAwesomeIcon icon={faPlay} />
          </VideoButton>
        ) : (
          <span />
        )}
      </ConferenceItem>
    );
  };

  return (
    <Section id="conferences">
      <SectionContent>
        <Title>Speaking</Title>

        <ConferenceGallery />

        <Controls>
          <Tabs role="tablist">
            <TabButton
              role="tab"
              aria-selected={activeTab === 'upcoming'}
              $active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming<span className="count">{upcomingConferences.length}</span>
            </TabButton>
            <TabButton
              role="tab"
              aria-selected={activeTab === 'past'}
              $active={activeTab === 'past'}
              onClick={() => setActiveTab('past')}
            >
              Past<span className="count">{pastCount}</span>
            </TabButton>
          </Tabs>

          <FilterToggle
            $active={showVideosOnly}
            role="switch"
            aria-checked={showVideosOnly}
            onClick={() => setShowVideosOnly((previous) => !previous)}
          >
            <span className="track" aria-hidden="true" />
            With video
          </FilterToggle>
        </Controls>

        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {upcomingConferences.length > 0 ? (
                <ConferenceList>
                  {upcomingConferences.map((conf, index) =>
                    renderItem(conf, index, { upcoming: true })
                  )}
                </ConferenceList>
              ) : (
                <EmptyState>
                  {showVideosOnly
                    ? 'No upcoming talks with a recording yet'
                    : 'No upcoming talks announced right now'}
                </EmptyState>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {pastByYear.length > 0 ? (
                pastByYear.map(([year, confs]) => {
                  const isExpanded = expandedYears[year];
                  const visible = isExpanded
                    ? confs
                    : confs.slice(0, COLLAPSED_PER_YEAR);

                  return (
                    <YearSection key={year}>
                      <YearHeader>
                        <h3>{year}</h3>
                        {confs.length > COLLAPSED_PER_YEAR && (
                          <ShowMoreButton onClick={() => toggleYear(year)}>
                            {isExpanded
                              ? 'Show less'
                              : `Show all ${confs.length}`}
                          </ShowMoreButton>
                        )}
                      </YearHeader>
                      <ConferenceList>
                        {visible.map((conf, index) => renderItem(conf, index))}
                      </ConferenceList>
                    </YearSection>
                  );
                })
              ) : (
                <EmptyState>No past talks with a recording yet</EmptyState>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </SectionContent>
    </Section>
  );
};

export default Conferences;
