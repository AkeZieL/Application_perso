FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    postgresql-client \
    gcc \
    python3-dev \
    musl-dev \
    gettext \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Variables GeoDjango (important pour éviter GDAL errors)
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Créer un venv
RUN python -m venv /env
ENV PATH="/env/bin:$PATH"

# Installer dépendances Python
COPY ./conf/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY ./plateforme /plateforme

# Copier le code
COPY tools/check_db.py  /tmp/check_db.py
COPY tools/start_server.sh  /tmp/start_server.sh
#COPY tools/fixture.json   /tmp/fixture.json

RUN chmod +x /tmp/start_server.sh /tmp/check_db.py

EXPOSE 8000

WORKDIR /plateforme

ENTRYPOINT ["sh", "/tmp/start_server.sh"]