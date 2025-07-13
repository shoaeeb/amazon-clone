# Amazon Clone Deployment Guide

## Environment Variables Required

Set these environment variables in your deployment platform:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Deployment Options

### 1. Heroku (Full Stack)
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-amazon-clone

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set PAYPAL_CLIENT_ID=your_paypal_id

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 2. Vercel (Full Stack)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### 3. Netlify (Frontend) + Heroku (Backend)
```bash
# Deploy backend to Heroku first
# Then deploy frontend to Netlify
# Update netlify.toml with your Heroku backend URL
```

### 4. Docker
```bash
# Build image
docker build -t amazon-clone .

# Run container
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=your_uri \
  -e JWT_SECRET=your_secret \
  amazon-clone
```

## Database Setup

1. Create MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Add to environment variables
5. Run seeder: `npm run seed`

## Post-Deployment

1. Test all functionality
2. Seed database with products
3. Test payment flow
4. Monitor logs for errors