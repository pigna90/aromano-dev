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

const BlogCard = styled(motion.a)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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

  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .date {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const MoreLink = styled.a`
  display: inline-block;
  margin-top: 2rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
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

  return (
    <Section id="blog">
      <SectionContent>
        <Title>Blog</Title>
        {loading ? (
          <LoadingSpinner>Loading latest articles...</LoadingSpinner>
        ) : (
          <>
            <BlogContainer>
              {posts.map((post, index) => (
                <BlogCard
                  key={post.title}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  <BlogContent>
                    <h3>{post.title}</h3>
                    <div className="date">{post.date}</div>
                    <p className="description">{post.description}</p>
                  </BlogContent>
                </BlogCard>
              ))}
            </BlogContainer>
            <MoreLink 
              href="https://medium.com/@alerom90" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              More on Medium →
            </MoreLink>
          </>
        )}
      </SectionContent>
    </Section>
  );
};

export default Blog; 