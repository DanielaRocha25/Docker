FROM mysql
ENV MYSQL_DATABASE=livros \
    MYSQL_ROOT_PASSWORD=senha
EXPOSE 3306
COPY testdump.sql /docker-entrypoint-initdb.d
