import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Amazon Clone - Online Shopping', 
  description = 'Your one-stop online shopping destination. Browse thousands of products with fast shipping and secure payments.',
  keywords = 'online shopping, ecommerce, electronics, books, clothing',
  image = '/logo512.png',
  url = 'https://amazon-clone-1-t4xr.onrender.com'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;