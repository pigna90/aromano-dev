/**
 * Blog posts data fetcher
 */
export async function fetchBlogPosts() {
  try {
    // Fetch Medium posts
    const mediumResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@alerom90');
    const mediumData = await mediumResponse.json();
    
    // Fetch Substack posts
    const substackResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://alerom90.substack.com/feed');
    const substackData = await substackResponse.json();
    
    if (mediumData.status !== 'ok') {
      throw new Error('Failed to fetch Medium RSS feed');
    }

    if (substackData.status !== 'ok') {
      throw new Error('Failed to fetch Substack RSS feed');
    }

    const posts = [];

    // Process Medium post (latest one)
    if (mediumData.items.length > 0) {
      const mediumItem = mediumData.items[0];
      let image = mediumItem.thumbnail;
      
      if (!image) {
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        const matches = [...mediumItem.content.matchAll(imgRegex)];
        if (matches.length > 0) {
          image = matches[0][1];
        }
      }

      const cleanDescription = mediumItem.description
        .replace(/<h3>.*?<\/h3>/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .replace(/Continue reading on.*$/, '')
        .trim();

      const firstTwoLines = cleanDescription.split('\n').slice(0, 2).join(' ').trim();

      if (!image && mediumItem.description.includes('<img')) {
        const descImgMatch = mediumItem.description.match(/<img[^>]+src="([^">]+)"[^>]*>/);
        if (descImgMatch) {
          image = descImgMatch[1];
        }
      }

      if (image && image.startsWith('http:')) {
        image = image.replace('http:', 'https:');
      }

      if (!image) {
        image = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';
      }

      posts.push({
        title: mediumItem.title,
        date: new Date(mediumItem.pubDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        description: firstTwoLines,
        link: mediumItem.link,
        image: image,
        source: 'Medium'
      });
    }

    // Process Substack post (latest one)
    if (substackData.items.length > 0) {
      const substackItem = substackData.items[0];
      let image = substackItem.thumbnail;
      
      if (!image) {
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        const matches = [...substackItem.content.matchAll(imgRegex)];
        if (matches.length > 0) {
          image = matches[0][1];
        }
      }

      const cleanDescription = substackItem.description
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const firstTwoLines = cleanDescription.split('\n').slice(0, 2).join(' ').trim();

      if (!image && substackItem.description.includes('<img')) {
        const descImgMatch = substackItem.description.match(/<img[^>]+src="([^">]+)"[^>]*>/);
        if (descImgMatch) {
          image = descImgMatch[1];
        }
      }

      if (image && image.startsWith('http:')) {
        image = image.replace('http:', 'https:');
      }

      if (!image) {
        image = 'https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdefault_cover_image.png';
      }

      posts.push({
        title: substackItem.title,
        date: new Date(substackItem.pubDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        description: firstTwoLines,
        link: substackItem.link,
        image: image,
        source: 'Substack'
      });
    }
    
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
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ry_FQpiLqgZJ-wZqZF_Qbw.png',
        source: 'Medium'
      },
      {
        title: 'Latest from Substack',
        date: 'March 19, 2024',
        description: 'Check out my latest thoughts and insights on my Substack newsletter.',
        link: 'https://alerom90.substack.com/?r=6cbz4y&utm_campaign=pub-share-checklist',
        image: 'https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdefault_cover_image.png',
        source: 'Substack'
      }
    ];
  }
} 