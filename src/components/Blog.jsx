import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';
import { fetchBlogPosts } from '../data/blog';

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BlogCard = styled(motion.a)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border-top: 4px solid ${props => props.source === 'Medium' ? '#00AB6C' : '#FF6719'};
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e8ed;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: #f5f6fa;
  border-bottom: 1px solid #e1e8ed;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;

  h3 {
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    line-height: 1.3;
    font-weight: 600;
  }

  .date {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .source {
    color: ${props => props.source === 'Medium' ? '#00AB6C' : '#FF6719'};
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .source-icon {
    width: 16px;
    height: 16px;
  }

  .description {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
`;

const CardFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
`;

const MoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.source === 'Medium' ? '#00AB6C' : '#FF6719'};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;

  &:hover {
    color: ${props => props.source === 'Medium' ? '#008f5a' : '#e55a0f'};
    transform: translateX(4px);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #3498db;
  font-size: 1.1rem;
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchBlogPosts();
        console.log('Loaded posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';
  };

  const getPlatformIcon = (source) => {
    if (source === 'Medium') {
      return (
        <svg className="source-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      );
    } else if (source === 'Substack') {
      return (
        <svg className="source-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
        </svg>
      );
    }
    return null;
  };

  const getMoreLink = (source) => {
    const linkText = source === 'Medium' ? 'Read more on Medium' : 'Read more on Substack';
    const linkUrl = source === 'Medium' 
      ? 'https://medium.com/@alerom90' 
      : 'https://alerom90.substack.com/?r=6cbz4y&utm_campaign=pub-share-checklist';
    
    return (
      <CardFooter>
        <MoreLink 
          href={linkUrl}
          target="_blank" 
          rel="noopener noreferrer"
          source={source}
        >
          {linkText}
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 17l9.2-9.2M17 17V7H7"/>
          </svg>
        </MoreLink>
      </CardFooter>
    );
  };

  return (
    <Section id="blog">
      <SectionContent>
        <Title>Blog</Title>
        {loading ? (
          <LoadingSpinner>Loading latest articles...</LoadingSpinner>
        ) : (
          <BlogContainer>
            {posts.map((post, index) => (
              <BlogCardContainer key={post.title}>
                <BlogCard
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  source={post.source}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BlogImage>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy" 
                      onError={handleImageError}
                    />
                  </BlogImage>
                  <BlogContent source={post.source}>
                    <div className="source">
                      {getPlatformIcon(post.source)}
                      {post.source}
                    </div>
                    <h3>{post.title}</h3>
                    <div className="date">{post.date}</div>
                    <p className="description">{post.description}</p>
                  </BlogContent>
                </BlogCard>
                {getMoreLink(post.source)}
              </BlogCardContainer>
            ))}
          </BlogContainer>
        )}
      </SectionContent>
    </Section>
  );
};

export default Blog; 