const fs = require('fs');
const path = require('path');

// Your domain URL (replace with your actual Render URL)
const DOMAIN = 'https://amazon-clone-1-t4xr.onrender.com';

// Static pages
const staticPages = [
  '',
  '/login',
  '/register',
  '/cart',
  '/shipping',
  '/payment',
  '/profile'
];

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${DOMAIN}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add product pages (you can expand this based on your products)
  // For now, adding sample product URLs
  for (let i = 1; i <= 10; i++) {
    sitemap += `
  <url>
    <loc>${DOMAIN}/product/${i}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  sitemap += `
</urlset>`;

  // Write sitemap to public folder
  const sitemapPath = path.join(__dirname, 'client', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap generated successfully at:', sitemapPath);
}

// Run the generator
generateSitemap();

module.exports = generateSitemap;