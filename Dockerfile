FROM node:20-alpine

# Set production environment
ENV NODE_ENV=development

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Copy development env for staging deployment
# development 환경 변수를 사용하므로 .env.development를 복사
#COPY .env.development .env
RUN cp .env.development .env

# Build Relay
RUN yarn relay

# Build Next.js
RUN yarn build

# Expose port for Elastic Beanstalk
EXPOSE 8080

# Start the application
CMD ["yarn", "start"]