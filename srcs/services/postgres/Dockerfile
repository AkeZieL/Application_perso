FROM postgis/postgis:16-3.5

LABEL maintainer="PostGIS Project - https://postgis.net"

# Init PostGIS (auto exécuté au premier démarrage)
COPY ./tools/initdb-postgis.sh /docker-entrypoint-initdb.d/10_postgis.sh

RUN chmod +x /usr/local/bin/update-postgis.sh

# Fichier de backup (si utilisé par ton app)
COPY tools/backup.csv /tmp/backup.csv