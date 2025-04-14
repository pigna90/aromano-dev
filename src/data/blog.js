/**
 * Blog posts data fetcher
 */
export async function fetchBlogPosts() {
  try {
    // Using a CORS proxy to access Medium's RSS feed
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@alerom90');
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch RSS feed');
    }

    // Get the two most recent posts
    const posts = data.items.slice(0, 2).map(item => {
      // Extract image from content if not available in thumbnail
      let image = item.thumbnail;
      
      if (!image) {
        // Try to find the first image in the content
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        const matches = [...item.content.matchAll(imgRegex)];
        if (matches.length > 0) {
          image = matches[0][1];
        }
      }

      // Clean up the description
      const cleanDescription = item.description
        .replace(/<h3>.*?<\/h3>/g, '') // Remove h3 tags and content
        .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/Continue reading on.*$/, '') // Remove "Continue reading on" text
        .trim()
        .slice(0, 200) + '...';

      // If still no image, try to extract from description
      if (!image && item.description.includes('<img')) {
        const descImgMatch = item.description.match(/<img[^>]+src="([^">]+)"[^>]*>/);
        if (descImgMatch) {
          image = descImgMatch[1];
        }
      }

      // Make sure image URL uses HTTPS
      if (image && image.startsWith('http:')) {
        image = image.replace('http:', 'https:');
      }

      // If still no image, use a default placeholder
      if (!image) {
        image = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';
      }

      console.log('Processed post:', {
        title: item.title,
        image: image,
        description: cleanDescription.substring(0, 50) + '...'
      });

      return {
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        description: cleanDescription,
        link: item.link,
        image: image
      };
    });
    
    console.log('Fetched posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return fallback data in case of error
    return [
      {
        title: 'Pandas vs Polars: A Comprehensive Comparison',
        date: 'March 26, 2024',
        description: 'A detailed comparison between Pandas and Polars, exploring their differences in syntax, performance, and use cases to help you choose the right tool for your data analysis needs.',
        link: 'https://medium.com/@alerom90/pandas-vs-polars-a-comprehensive-comparison-df1bff469489',
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ry_FQpiLqgZJ-wZqZF_Qbw.png'
      },
      {
        title: 'Agentic AI: Building Multi-Agent Applications with CrewAI',
        date: 'March 19, 2024',
        description: 'Learn how to build and orchestrate AI agents using CrewAI, a powerful framework for creating multi-agent applications that can work together to solve complex tasks.',
        link: 'https://medium.com/@alerom90/agentic-ai-building-multi-agent-applications-with-crewai-52bef977350f',
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mWBPQfaQhtNa-yqK7lhkrA.png'
      }
    ];
  }
} 