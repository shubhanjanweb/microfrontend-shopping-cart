FROM nginx:1.22
RUN rm /etc/nginx/conf.d/default.conf
COPY ./ /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf