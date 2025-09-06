FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Puppeteer yêu cầu Chromium
RUN apt-get update && apt-get install -y \
  chromium \
  ffmpeg \
  && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "loadtest-video.js"]
