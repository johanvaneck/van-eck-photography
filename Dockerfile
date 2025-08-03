# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Copy package.json for the start script
COPY package.json ./

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
