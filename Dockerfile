FROM node:18-alpine AS v1
WORKDIR /app

COPY V1/ .
RUN npm install
RUN npm run build

FROM node:18-alpine AS v2
WORKDIR /app

COPY V2/ .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server --prod
FROM nginx:1.23.2 AS prod
COPY --from=v1 /app/dist/fr-administration-front/browser/ /usr/share/nginx/html1
COPY --from=v2 /app/dist/fr-administration-front/browser/ /usr/share/nginx/html2
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80


# Serve Application using Nginx Server --dev
FROM nginx:1.23.2 AS dev
COPY --from=v1 /app/dist/fr-administration-front/browser/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.dev.conf /etc/nginx/conf.d
EXPOSE 80
