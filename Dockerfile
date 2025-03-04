# Build stage
FROM node:latest-alpine AS build-stage
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour l'installation
COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copie du build de Vue.js vers Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Ajout d'un fichier de configuration custom pour Nginx (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]