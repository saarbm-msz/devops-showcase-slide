# ----------- Build Stage ----------- #
FROM node:18-alpine AS builder
WORKDIR /app

# Create a .env file from build args
ARG VITE_API_URL

# Create .env file
RUN touch .env && \
    echo "VITE_API_URL=$VITE_API_URL" >> .env && \

    # Install dependencies and build the app
    COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build

# ----------- Production Stage with Nginx ----------- #
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config for Vite SPA routing
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]