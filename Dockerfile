FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY . .

# Build frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Back to root
WORKDIR /app

# Remove client source files (keep build)
RUN rm -rf client/src client/public client/package*.json

EXPOSE 5000

CMD ["npm", "start"]