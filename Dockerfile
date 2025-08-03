# Use a single stage for building and running
FROM node:22-alpine

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

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
