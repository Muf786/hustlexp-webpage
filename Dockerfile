# 1. Build your Vite + React app
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Serve static files using gostatic
FROM pierrezemb/gostatic
COPY --from=builder /app/dist /srv/http
