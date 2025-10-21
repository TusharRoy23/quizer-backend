# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app
# ENV NODE_OPTIONS=--max-old-space-size=4096

# Install system deps for build (incl. prisma generation)
RUN apk add --no-cache tzdata python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev, needed for build + prisma)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client (creates node_modules/@prisma/client + .prisma)
RUN npx prisma generate

# Build project (TS → dist)
RUN npm run build


# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install tzdata for timezone support
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Europe/Stockholm /etc/localtime \
    && echo "Europe/Stockholm" > /etc/timezone

# Copy only package files first
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy build artifacts and Prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
# COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create and use non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# Expose runtime port
EXPOSE 8000

# Start compiled app
CMD ["node", "--max-old-space-size=4096", "dist/main.js"]
