FROM node:20.11-alpine as react_build
WORKDIR /app
COPY . .
RUN rm /app/package-lock.json
RUN npm install
ENV VITE_MODE=production
ENV VITE_KEYCLOAK_SERVER=http://keycloak:8080
ENV VITE_KEYCLOAK_REALM=model-registry
ENV VITE_KEYCLOAK_CLIENT_ID=x5_models
ENV VITE_KEYCLOAK_REFRESH_TIME_MS=60000
ENV VITE_BACKEND_SERVER=http://api:8001
RUN npm run build

FROM nginx:alpine3.18
COPY --from=react_build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/site.conf /etc/nginx/conf.d/site.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]