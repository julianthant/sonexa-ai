# Base stage
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Ensure standalone files exist
RUN ls -la .next/ || echo "No .next directory found"
RUN ls -la .next/standalone/ || echo "No standalone directory found"
RUN ls -la public/ || echo "No public directory found"

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./

# Copy public directory if it exists
COPY --from=builder /app/public ./public

# Copy standalone output
COPY --from=builder /app/.next/standalone/ ./

# Copy static files
COPY --from=builder /app/.next/static ./.next/static

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Expose port
EXPOSE 3000

# Start the application (try server.js first, fallback to next start)
CMD ["node", "server.js"]

# Default target
FROM production 