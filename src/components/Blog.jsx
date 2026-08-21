import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Section,
  SectionContent,
  Title,
  ArrowLink,
  cardSurface,
} from '../styles/SharedStyles';
import { fetchBlogPosts } from '../data/blog';

const BlogContainer = styled.div`
  display: grid;
  /* auto-fit, not auto-fill: with only two feeds we don't want an empty third track */
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1.5rem;
`;

const BlogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const BlogCard = styled(motion.a)`
  ${cardSurface}
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: ${({ theme }) => theme.colors.shadowHardLg};
  }
`;

const BlogImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceSunken};
  border-bottom: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.motion.slow};
  }

  ${BlogCard}:hover & img {
    transform: scale(1.03);
  }
`;

const BlogContent = styled.div`
  padding: 1.35rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  /* Source and date share one mono meta line */
  .meta {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkSecondary};
    margin-bottom: 0.9rem;
  }

  /* The platform is a filled chip, so the two feeds are told apart at a glance */
  .source {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.2rem 0.4rem;
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.bg};
  }

  .source-icon {
    width: 12px;
    height: 12px;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.375rem;
    font-weight: 800;
    font-stretch: 100%;
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 0.6rem;
  }

  .description {
    color: ${({ theme }) => theme.colors.inkSecondary};
    font-size: 0.9375rem;
    line-height: 1.5;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  min-height: 120px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const SOURCES = {
  Medium: { label: 'Medium', url: 'https://medium.com/@alerom90' },
  Substack: {
    label: 'Substack',
    url: 'https://alerom90.substack.com/?r=6cbz4y&utm_campaign=pub-share-checklist',
  },
};

const FALLBACK_IMAGE =
  'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';

const PLATFORM_PATHS = {
  Medium:
    'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z',
  Substack:
    'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setPosts(await fetchBlogPosts());
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  const renderPlatformIcon = (source) => {
    const path = PLATFORM_PATHS[source];
    if (!path) return null;

    return (
      <svg className="source-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    );
  };

  return (
    <Section id="blog" $sunken>
      <SectionContent>
        <Title>Writing</Title>
        {loading ? (
          <LoadingState>Loading latest articles</LoadingState>
        ) : (
          <BlogContainer>
            {posts.map((post, index) => {
              const source = SOURCES[post.source];

              return (
                <BlogCardContainer key={post.title}>
                  <BlogCard
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                  >
                    <BlogImage>
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </BlogImage>
                    <BlogContent>
                      <div className="meta">
                        <span className="source">
                          {renderPlatformIcon(post.source)}
                          {post.source}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p className="description">{post.description}</p>
                    </BlogContent>
                  </BlogCard>

                  {source && (
                    <ArrowLink
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More on {source.label}
                    </ArrowLink>
                  )}
                </BlogCardContainer>
              );
            })}
          </BlogContainer>
        )}
      </SectionContent>
    </Section>
  );
};

export default Blog;
