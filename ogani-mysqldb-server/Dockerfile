FROM mysql:5-debian
EXPOSE 3306
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=oganidb
ENV MYSQL_PASSWORD=password
COPY docker-healthcheck /usr/local/bin/
COPY ./init/ /docker-entrypoint-initdb.d/
HEALTHCHECK CMD ["docker-healthcheck"]