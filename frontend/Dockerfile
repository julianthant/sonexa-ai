# Base stage
FROM node:18-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Development stage
FROM base AS development

# Copy package files and install dependencies (cached layer)
COPY package*.json ./
RUN npm ci --only=development

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]

# Dependencies stage - cache dependencies separately
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install dependencies based on the preferred package manager
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS builder

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Set production environment for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Ensure standalone files exist
RUN ls -la .next/ || echo "No .next directory found"
RUN ls -la .next/standalone/ || echo "No standalone directory found"
RUN ls -la public/ || echo "No public directory found"

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./

# Copy public directory if it exists
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to nextjs user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application with proper signal handling
CMD ["dumb-init", "node", "server.js"]

# Default target
FROM production 