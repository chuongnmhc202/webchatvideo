# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY . .

# 👇 Copy file env
COPY .env.production .env

RUN npm install
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy built files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

COPY ./public/env-config.js /usr/share/nginx/html/env-config.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
