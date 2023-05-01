FROM node:alpine3.15 as BUILD
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:single-spa:ogani-user-web

FROM nginx:1.22
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=BUILD /usr/app/dist/ogani-user-web /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
