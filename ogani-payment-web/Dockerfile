FROM node:16-bullseye as build-stage
# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apt-get update
RUN apt-get install -y python3
# Build project
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g @vue/cli-service
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf